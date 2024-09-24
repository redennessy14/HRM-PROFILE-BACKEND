import { ModuleMetadata } from '@nestjs/common';

export interface MinioOptions {
  endPoint: string;
  port: number;
  useSSL: boolean;
  accessKey: string;
  secretKey: string;
  bucket?: string;
}

export type MinioAsyncOptions = Pick<ModuleMetadata, 'imports'> & {
  inject?: any[];
  useValue?: MinioOptions;
  useFactory?: (...args: any[]) => Promise<MinioOptions> | MinioOptions;
};
