import { AppOptions } from './options';
import { Environment } from './environment';

type AppConfig = {
  app: AppOptions;
};

export const loadAppConfig = (): AppConfig => ({
  app: {
    http: { port: +process.env.HTTP_PORT },
    host: process.env.HOST,
    env: process.env.ENV as Environment,
    loggingRequests: true,
    metricsPath: '/metrics',
    rateLimiting: {
      throttlers: [
        {
          ttl: +process.env.THROTTLER_TTL_SECONDS * 1000,
          limit: +process.env.THROTTLER_LIMIT,
        },
      ],
    },
  },
});
