import * as Joi from 'joi';

export const configLocalValidationSchema = Joi.object({
  ssm: Joi.object({
    region: Joi.string().required(),
    accessKeyId: Joi.string().required(),
    secretAccessKey: Joi.string().required(),
  }),
}).options({ allowUnknown: true, abortEarly: false });
