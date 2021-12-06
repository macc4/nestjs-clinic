import * as glob from 'glob';
import * as yaml from 'js-yaml';
import * as _ from 'lodash';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { SSM } from 'aws-sdk';
import { Config, ConfigModuleOptions } from './config.types';
import { CONFIG_STORE } from './config.constants';
import { ConfigService } from './config.service';

@Module({})
export class ConfigModule {
  public static register(options: ConfigModuleOptions): DynamicModule {
    return {
      module: ConfigModule,
      global: options.isGlobal,
      providers: [ConfigService, ...this.createProviders(options)],
      exports: [ConfigService],
    };
  }

  private static createProviders(options: ConfigModuleOptions): Provider[] {
    return [
      {
        provide: CONFIG_STORE,
        useFactory: async (): Promise<Config> => {
          return this.loadConfigs(options);
        },
      },
    ];
  }

  private static async loadConfigs(
    options: ConfigModuleOptions,
  ): Promise<Config> {
    let internalConfig: Config = {};

    const localConfig = this.loadLocalConfig(options);

    _.merge(internalConfig, localConfig);

    if (!options.ignoreEnvFile) {
      const envConfig = this.loadEnvConfig(options);

      if (options.overrideValuesWithEnv) {
        _.merge(internalConfig, envConfig);
      } else {
        internalConfig = _.merge(envConfig, internalConfig);
      }
    }

    if (options.ssm) {
      const ssmConfig = await this.loadSsmConfig(options, internalConfig);

      if (options.overrideValuesWithSsm) {
        _.merge(internalConfig, ssmConfig);
      } else {
        internalConfig = _.merge(ssmConfig, internalConfig);
      }
    }

    if (options.globalValidationSchema) {
      const { error } = options.globalValidationSchema.validate(internalConfig);

      if (error) {
        throw new Error(`Local config validation error: ${error.message}`);
      }
    }

    return internalConfig;
  }

  private static loadLocalConfig(options: ConfigModuleOptions): Config {
    // TODO add support for custom yaml paths

    const nodeEnv = process.env.NODE_ENV || 'local';

    let config: Config = {};

    const [baseConfigFile] = glob.sync('./**/config.base.yaml', {
      absolute: true,
      ignore: './node_modules/*',
    });
    const [envConfigFile] = glob.sync(`./**/config.${nodeEnv}.yaml`, {
      absolute: true,
      ignore: './node_modules/*',
    });

    if (baseConfigFile) {
      config = yaml.load(readFileSync(baseConfigFile, 'utf-8')) as Config;
    }

    if (envConfigFile) {
      const envConfig = yaml.load(
        readFileSync(envConfigFile, 'utf-8'),
      ) as Config;

      _.merge(config, envConfig);
    }

    if (options.yamlValidationSchema) {
      const { error } = options.yamlValidationSchema.validate(config);

      if (error) {
        throw new Error(`Local config validation error: ${error.message}`);
      }
    }

    return config;
  }

  private static loadEnvConfig(options: ConfigModuleOptions): Config {
    // TODO add support for custom env paths
    let envConfig: Config = {};

    const envFilePath = resolve(process.cwd(), '.env');

    if (existsSync(envFilePath)) {
      envConfig = dotenv.parse(readFileSync(envFilePath));
    }

    return envConfig;
  }

  private static async loadSsmConfig(
    options: ConfigModuleOptions,
    localConfig: Config,
  ): Promise<Config> {
    const region: string = _.get(localConfig, options.ssm.regionReference);
    const accessKeyId: string = _.get(
      localConfig,
      options.ssm.accessKeyIdReference,
    );
    const secretAccessKey: string = _.get(
      localConfig,
      options.ssm.secretAccessKeyReference,
    );

    const ssmClient = new SSM({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const { paths } = options.ssm;

    const ssmConfig: Config = {};

    for (let i = 0; i < paths.length; i++) {
      const result = await ssmClient
        .getParametersByPath({
          Path: paths[i],
          Recursive: true,
        })
        .promise();

      result.Parameters.forEach((ssmParameter) => {
        _.set(
          ssmConfig,
          ssmParameter.Name.split(paths[i])[1],
          ssmParameter.Value,
        );
      });
    }

    if (Object.keys(ssmConfig).length === 0) {
      throw new Error(
        'No parameters were fetched from the specified SSM paths. Please, delete the ssm properties from the options object to use only the local config or double check the AWS Parameter Store values',
      );
    }

    return ssmConfig;
  }
}
