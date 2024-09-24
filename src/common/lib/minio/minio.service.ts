import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'minio';

import { MINO_OPTIONS } from './constant';
import { MinioOptions } from './minio.options';

@Injectable()
export class MinioService {
  private _client: Client;

  constructor(@Inject(MINO_OPTIONS) private options: MinioOptions) {
    this._client = new Client(options);
  }

  get client(): Client {
    return this._client;
  }
}
