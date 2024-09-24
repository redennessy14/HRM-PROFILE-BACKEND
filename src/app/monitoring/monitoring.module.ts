import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

import { MetricsController, HealthController } from './controller';
import { RequestLoggingInterceptor } from './interceptor';
import { ConfigModule } from '../config';

@Module({
  imports: [
    TerminusModule,
    PrometheusModule.register({
      controller: MetricsController,
    }),
    ConfigModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggingInterceptor,
    },
  ],
})
export class MonitoringModule {}
