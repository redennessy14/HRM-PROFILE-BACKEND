import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { MinioModule } from 'src/common/lib';
import { ConfigModule, ConfigService } from 'src/app/config';
import { LeaveCountEntity } from 'src/data-access';
import { ProfileEntity } from 'src/data-access/profile.entity';

import { Adapters, Resources, Persistence } from './port';
import { Application } from './application';
import { EventHandlers } from './application/event/handler';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/auth/config/jwt.config';
import { CacheModule } from '@nestjs/cache-manager';
import { DocumentEntity } from 'src/data-access/document.entity';
import { GoogleModule } from '../common/lib/google/google.module';

@Module({
  imports: [
    CqrsModule,
    ConfigModule,
    TypeOrmModule.forFeature([ProfileEntity, LeaveCountEntity, DocumentEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    MinioModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: ({ minio }: ConfigService) => minio,
    }),
    GoogleModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: ({ google }: ConfigService) => google,
    }),
    CacheModule.register({
      ttl: 120000,
    }),
  ],
  controllers: [...Resources],
  providers: [...Adapters, ...Application, ...Persistence, ...EventHandlers],
})
export class ProfileModule {}
