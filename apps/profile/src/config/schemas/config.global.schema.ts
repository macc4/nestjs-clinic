import * as Joi from 'joi';

export const configGlobalValidationSchema = Joi.object({
  PORT: Joi.number().required(),

  AUTH_SERVICE_PORT: Joi.number().required(),
  CLINIC_SERVICE_PORT: Joi.number().required(),
  PROFILE_SERVICE_PORT: Joi.number().required(),

  CLINIC_SERVICE_GRPC_HOST: Joi.string().required(),
  PROFILE_SERVICE_GRPC_HOST: Joi.string().required(),

  CLINIC_SERVICE_GRPC_PORT: Joi.number().required(),
  PROFILE_SERVICE_GRPC_PORT: Joi.number().required(),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRY: Joi.number().required(),

  ssm: Joi.object({
    region: Joi.string().required(),
    accessKeyId: Joi.string().required(),
    secretAccessKey: Joi.string().required(),
  }),

  s3: Joi.object({
    region: Joi.string().required(),
    accessKeyId: Joi.string().required(),
    secretAccessKey: Joi.string().required(),
  }),
}).options({ allowUnknown: true, abortEarly: false });
