import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(8080).required(),
  EXPIRY: Joi.number().default(-1).required(),

  DB_HOST: Joi.string().default('localhost').required(),
  DB_PORT: Joi.number().default(5432).required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),

  REDIS_HOST: Joi.string().default('redis').required(),
  REDIS_PORT: Joi.number().default(6379).required(),
  REDIS_TTL: Joi.number().default(86400).required(),

  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRY: Joi.number().required(),
});
