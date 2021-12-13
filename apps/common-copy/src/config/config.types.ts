import Joi from 'joi';

export type Config = Record<string, any>;

export interface ConfigModuleOptions {
  overrideValuesWithSsm?: boolean;
  localValidationSchema?: Joi.Schema;
  globalValidationSchema?: Joi.Schema;
  ssm?: {
    paths: string[];
    regionReference: string;
    accessKeyIdReference: string;
    secretAccessKeyReference: string;
  };
}
