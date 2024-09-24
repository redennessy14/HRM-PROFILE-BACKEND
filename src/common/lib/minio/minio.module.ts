import { DynamicModule, Module, Provider } from '@nestjs/common';

import { MinioService } from './minio.service';
import { MinioAsyncOptions, MinioOptions } from './minio.options';
import { MINO_OPTIONS } from './constant';

@Module({})
export class MinioModule {
  static forRoot = (options: MinioOptions): DynamicModule => ({
    module: MinioModule,
    providers: [...MinioModule.providers({ useValue: options })],
    exports: [MinioService],
  });

  static forRootAsync = ({
    imports,
    useFactory,
    inject,
  }: MinioAsyncOptions): DynamicModule => {
    return {
      module: MinioModule,
      imports,
      providers: [...MinioModule.providers({ useFactory, inject })],
      exports: [MinioService],
    };
  };

  private static providers = ({
    useValue,
    useFactory,
    inject,
  }: MinioAsyncOptions) => {
    const providers: Provider[] = [MinioService];

    if (useValue) {
      providers.push({
        provide: MINO_OPTIONS,
        useValue,
      });
    } else if (useFactory) {
      providers.push({
        provide: MINO_OPTIONS,
        useFactory,
        inject,
      });
    }

    return providers;
  };
}
