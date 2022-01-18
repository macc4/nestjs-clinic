import * as Joi from 'joi';

export const configGlobalValidationSchema = Joi.object({
  ssm: Joi.object({
    region: Joi.string().required(),
    accessKeyId: Joi.string().required(),
    secretAccessKey: Joi.string().required(),
  }),
}).options({ allowUnknown: true, abortEarly: false });
