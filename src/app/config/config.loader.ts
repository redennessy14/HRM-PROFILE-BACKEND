import { registerAs } from '@nestjs/config';

import { loadAppConfig } from './app';
import { loadDbConfig } from './database';
import { loadSwaggerConfig } from './swagger';
import { loadMailerConfig } from './mailer';
import { loadMinioConfig } from './minio';
import { loadGoogleConfig } from './google';

export default registerAs('config', () => ({
  ...loadAppConfig(),
  ...loadDbConfig(),
  ...loadSwaggerConfig(),
  ...loadMailerConfig(),
  ...loadMinioConfig(),
  jwtSecret: process.env.JWT_SECRET,
  ...loadGoogleConfig(),
}));
