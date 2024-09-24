import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from 'src/app/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from './config/jwt.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/data-access/profile.entity';
import { ProfileRepository } from 'src/profile/port/persistence/profile.repository';
import { JwtStrategy } from './jwt.strategy';
import { MediaService } from 'src/profile/port/adapter/media.service';
import { MinioModule } from 'src/common/lib';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileEntity]),
    ConfigModule,
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
  ],
  controllers: [AuthController],
  providers: [AuthService, ProfileRepository, JwtStrategy, MediaService],
})
export class AuthModule {}
