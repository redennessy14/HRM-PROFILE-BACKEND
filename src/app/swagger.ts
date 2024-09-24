import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ConfigService, Environment } from './config';

export class Swagger {
  static configure = (app: INestApplication) => {
    const {
      swagger,
      app: { host, env },
    } = app.get<ConfigService>(ConfigService);

    const serverPath = env === Environment.LOCAL ? '/' : '/api/example';

    const config = new DocumentBuilder()
      .setTitle(swagger.info.title)
      .setDescription(swagger.info.description)
      .setVersion(swagger.info.version)
      .addServer(serverPath)
      .setExternalDoc('Postman Collection', `${host}/${swagger.path}-json`)
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup(swagger.path, app, document);
  };
}
