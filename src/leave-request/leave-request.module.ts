import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'src/app/config';
import { Resources, Adapters, Persistence } from './port';
import { Application } from './application';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileRepository } from 'src/profile/port/persistence/profile.repository';
import {
  LeaveRequestEntity,
  ProfileEntity,
  ApprovalEntity,
  LeaveCountEntity,
} from 'src/data-access';
import { CqrsModule } from '@nestjs/cqrs';
import { LeaveCountRepository } from 'src/profile/port/persistence/leave-count.repository';
import { LeaveCountService } from 'src/profile/application';
import { MinioModule } from 'src/common/lib';
import { MediaService } from 'src/profile/port/adapter/media.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      LeaveRequestEntity,
      ApprovalEntity,
      ProfileEntity,
      CqrsModule,
      LeaveCountEntity,
    ]),
    MinioModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: ({ minio }: ConfigService) => minio,
    }),
  ],
  controllers: [...Resources],
  providers: [
    ...Adapters,
    ...Application,
    ...Persistence,
    ProfileRepository,
    LeaveCountRepository,
    LeaveCountService,
    MediaService,
  ],
})
export class LeaveRequestModule {}
