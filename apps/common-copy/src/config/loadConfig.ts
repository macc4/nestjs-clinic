import * as glob from 'glob';
import * as yaml from 'js-yaml';
import * as _ from 'lodash';
import { SSM } from 'aws-sdk';
import { readFileSync } from 'fs';
import { Config, ConfigModuleOptions } from './config.types';

export const loadConfig = async (
  options: ConfigModuleOptions,
): Promise<Config> => {
  let internalConfig: Config = {};

  const localConfig = loadLocalConfig(options);

  _.merge(internalConfig, localConfig);

  if (options.ssm) {
    const ssmConfig = await loadSsmConfig(options, internalConfig);

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
};

const loadLocalConfig = (options: ConfigModuleOptions): Config => {
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
    const envConfig = yaml.load(readFileSync(envConfigFile, 'utf-8')) as Config;

    _.merge(config, envConfig);
  }

  if (options.localValidationSchema) {
    const { error } = options.localValidationSchema.validate(config);

    if (error) {
      throw new Error(`Local config validation error: ${error.message}`);
    }
  }

  return config;
};

const loadSsmConfig = async (
  options: ConfigModuleOptions,
  localConfig: Config,
): Promise<Config> => {
  const region: string = _.get(localConfig, options.ssm.regionReference);
  const accessKeyId: string = _.get(
    localConfig,
    options.ssm.accessKeyIdReference,
  );
  const secretAccessKey: string = _.get(
    localConfig,
    options.ssm.secretAccessKeyReference,
  );

  const ssmOptions: {
    region: string;
    credentials?: { accessKeyId: string; secretAccessKey: string };
  } = { region };

  if (accessKeyId && secretAccessKey) {
    ssmOptions.credentials = { accessKeyId, secretAccessKey };
  }

  const ssmClient = new SSM(ssmOptions);

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
};
