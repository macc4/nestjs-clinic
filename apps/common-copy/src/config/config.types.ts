import Joi from 'joi';

export type Config = Record<string, unknown>;

export interface ConfigModuleOptions {
  overrideValuesWithEnv?: boolean;
  overrideValuesWithSsm?: boolean;
  ignoreEnvFile?: boolean;
  isGlobal?: boolean;
  globalValidationSchema?: Joi.Schema;
  yamlValidationSchema?: Joi.Schema;
  ssm?: {
    paths: string[];
    regionReference: string;
    accessKeyIdReference: string;
    secretAccessKeyReference: string;
  };
}
