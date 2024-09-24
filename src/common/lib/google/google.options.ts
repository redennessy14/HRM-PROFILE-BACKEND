import { ModuleMetadata, Type } from '@nestjs/common';

export interface GoogleOptions {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
}

export interface GoogleOptionsFactory {
  createGoogleOptions(): Promise<GoogleOptions> | GoogleOptions;
}

export interface GoogleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<GoogleOptionsFactory>;
  useClass?: Type<GoogleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<GoogleOptions> | GoogleOptions;
  inject?: any[];
}
