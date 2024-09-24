import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from './config';
import { MonitoringModule } from './monitoring';
import { ProfileModule } from 'src/profile/profile.module';
import { AuthModule } from 'src/auth/auth.module';
import { LeaveRequestModule } from 'src/leave-request/leave-request.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { CalendarModule } from 'src/calendar/calendar.module';

@Module({
  imports: [
    MonitoringModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: ({ app: { rateLimiting } }: ConfigService) => rateLimiting,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: ({ database }: ConfigService) => database,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async ({ mailer }: ConfigService) => mailer,
    }),
    ProfileModule,
    AuthModule,
    LeaveRequestModule,
    CalendarModule,
  ],
})
export class AppModule {}
