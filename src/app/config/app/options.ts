import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { Environment } from './environment';

export type AppOptions = {
  http: { port: number };
  host: string;
  env: Environment;

  rateLimiting: ThrottlerModuleOptions;
  loggingRequests?: boolean;
  metricsPath: string;
};
