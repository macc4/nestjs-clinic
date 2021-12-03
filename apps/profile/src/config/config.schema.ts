import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(8080).required(),

  AUTH_SERVICE_PORT: Joi.number().default(3000).required(),
  CLINIC_SERVICE_PORT: Joi.number().default(3000).required(),
  PROFILE_SERVICE_PORT: Joi.number().default(3000).required(),

  CLINIC_SERVICE_GRPC_HOST: Joi.string().default('localhost').required(),
  PROFILE_SERVICE_GRPC_HOST: Joi.string().default('localhost').required(),

  CLINIC_SERVICE_GRPC_PORT: Joi.number().default(9090).required(),
  PROFILE_SERVICE_GRPC_PORT: Joi.number().default(9090).required(),

  DB_HOST: Joi.string().default('localhost').required(),
  DB_PORT: Joi.number().default(5432).required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRY: Joi.number().required(),

  // AWS_ACCESS_KEY_ID: Joi.string().required(),
  // AWS_SECRET_ACCESS_KEY: Joi.string().required(),
});
