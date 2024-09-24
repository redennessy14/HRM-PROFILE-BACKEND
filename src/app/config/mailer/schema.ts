import * as Joi from 'joi';

export const mailerConfigSchema = {
  MAIL_HOST: Joi.string().required(),
  MAIL_PORT: Joi.number().required(),
  MAIL_SECURE: Joi.boolean().required(),
  MAIL_USER: Joi.string().required(),
  MAIL_PASS: Joi.string().required(),
  MAIL_FROM_NAME: Joi.string().required(),
  MAIL_FROM_EMAIL: Joi.string().required(),
  MAIL_TEMPLATE_DIR: Joi.string().required(),
};
