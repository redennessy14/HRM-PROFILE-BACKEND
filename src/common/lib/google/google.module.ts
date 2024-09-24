import { DynamicModule, Module, Provider } from '@nestjs/common';

import { GoogleService } from './google.service';
import {
  GoogleAsyncOptions,
  GoogleOptions,
  GoogleOptionsFactory,
} from './google.options';

@Module({})
export class GoogleModule {
  static forRoot(options: GoogleOptions): DynamicModule {
    return {
      module: GoogleModule,
      providers: [...this.createProviders(options)],
      exports: [GoogleService],
    };
  }

  static forRootAsync(options: GoogleAsyncOptions): DynamicModule {
    return {
      module: GoogleModule,
      imports: options.imports || [],
      providers: [
        ...this.createAsyncProviders(options),
        {
          provide: GoogleService,
          useFactory: (googleOptions: GoogleOptions) =>
            new GoogleService(googleOptions),
          inject: ['GOOGLE_OPTIONS'],
        },
      ],
      exports: [GoogleService],
    };
  }

  private static createProviders(options: GoogleOptions): Provider[] {
    return [
      {
        provide: 'GOOGLE_OPTIONS',
        useValue: options,
      },
      GoogleService,
    ];
  }

  private static createAsyncProviders(options: GoogleAsyncOptions): Provider[] {
    if (options.useFactory) {
      return [
        {
          provide: 'GOOGLE_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ];
    }

    const useClass = options.useClass || options.useExisting;
    return [
      {
        provide: 'GOOGLE_OPTIONS',
        useFactory: async (optionsFactory: GoogleOptionsFactory) =>
          await optionsFactory.createGoogleOptions(),
        inject: [useClass],
      },
      {
        provide: useClass,
        useClass,
      },
    ];
  }
}
