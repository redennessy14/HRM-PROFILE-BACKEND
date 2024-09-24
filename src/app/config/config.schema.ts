import * as Joi from 'joi';

import { appConfigSchema } from './app';
import { databaseConfigSchema } from './database';
import { swaggerConfigSchema } from './swagger';
import { mailerConfigSchema } from './mailer';
import { minioConfigSchema } from './minio';
import { googleConfigSchema } from './google';

export const configSchema = Joi.object({
  ...appConfigSchema,
  ...databaseConfigSchema,
  ...swaggerConfigSchema,
  ...mailerConfigSchema,
  ...minioConfigSchema,
  JWT_SECRET: Joi.string().required(),
  ...googleConfigSchema,
});
