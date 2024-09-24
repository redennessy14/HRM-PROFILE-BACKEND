import * as Joi from 'joi';

import { Environment } from './environment';

export const appConfigSchema = {
  HTTP_PORT: Joi.number().default(5000),
  ENV: Joi.string()
    .valid(
      Environment.LOCAL,
      Environment.DEVELOPMENT,
      Environment.QA,
      Environment.PRODUCTION,
    )
    .default(Environment.LOCAL),

  THROTTLER_TTL_SECONDS: Joi.number().required(),
  THROTTLER_LIMIT: Joi.number().required(),
};
