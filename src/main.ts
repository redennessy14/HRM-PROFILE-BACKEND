import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule, ConfigService, Environment, Swagger } from './app';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const {
    app: { http, env },
  } = app.get<ConfigService>(ConfigService);

  if ([Environment.LOCAL, Environment.DEVELOPMENT].includes(env)) {
    Swagger.configure(app);
  }

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
    exposedHeaders: 'set-cookie',
  });

  await app.listen(http.port).then(() => {
    logger.debug(`Example app started on http port: ${http.port}`);
  });
}
bootstrap();
