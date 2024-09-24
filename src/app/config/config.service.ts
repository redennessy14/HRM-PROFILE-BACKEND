import { Global } from '@nestjs/common';
import { ConfigService as Config } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MinioOptions } from 'src/common/lib';

import { AppOptions } from './app';
import { SwaggerOptions } from './swagger';
import { MailerOptions } from '@nestjs-modules/mailer';
import { GoogleOptions } from 'src/common/lib/google';

@Global()
export class ConfigService {
  constructor(private config: Config) {}

  get app(): AppOptions {
    return this.config.get<AppOptions>('config.app');
  }

  get database(): TypeOrmModuleOptions {
    return this.config.get<TypeOrmModuleOptions>('config.database');
  }

  get swagger(): SwaggerOptions {
    return this.config.get<SwaggerOptions>('config.swagger');
  }

  get mailer(): MailerOptions {
    return this.config.get<MailerOptions>('config.mailer');
  }

  get minio(): MinioOptions {
    return this.config.get<MinioOptions>('config.minio');
  }
  get jwtSecret() {
    return this.config.get('config.jwtSecret');
  }

  get google(): GoogleOptions {
    return this.config.get<GoogleOptions>('config.google');
  }
}
