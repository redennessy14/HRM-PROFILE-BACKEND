import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'src/app/config';
import { Resources } from './port';
import { Application } from './application';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleModule } from 'src/common/lib/google';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([]),
    GoogleModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: ({ google }: ConfigService) => google,
    }),
  ],
  controllers: [...Resources],
  providers: [...Application],
})
export class CalendarModule {}
