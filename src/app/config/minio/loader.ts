import { MinioOptions } from 'src/common/lib';

type MinioConfig = {
  minio: MinioOptions;
};

export const loadMinioConfig = (): MinioConfig => ({
  minio: {
    endPoint: process.env.MINIO_ENDPOINT,
    port: +process.env.MINIO_PORT,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
    useSSL: false,
  },
});
