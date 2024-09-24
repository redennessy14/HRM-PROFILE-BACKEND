import * as Joi from 'joi';

export const swaggerConfigSchema = {
  DOCUMENTATION_PATH: Joi.string().default('docs'),
};
