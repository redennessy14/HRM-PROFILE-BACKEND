import { Injectable } from '@nestjs/common';
import { MinioService } from 'src/common/lib';

const timestampName = (name: string) => `${Date.now()}-${name}`;

@Injectable()
export class MediaService {
  private readonly bucketName: string = 'hrm';

  private get minio() {
    return this.minioService.client;
  }

  async initBucket() {
    const bucketExists = await this.minio.bucketExists(this.bucketName);
    if (!bucketExists) {
      await this.minio.makeBucket(this.bucketName);
    }
  }

  constructor(private minioService: MinioService) {}

  async uploadFile(file: Express.Multer.File) {
    const fileName = timestampName(file.originalname);
    const metaData = {
      'Content-Type': file.mimetype,
    };
    const fileSize = file.buffer.length;

    await this.minio.putObject(
      this.bucketName,
      fileName,
      file.buffer,
      fileSize,
      metaData,
    );

    return fileName;
  }

  async getFileUrl(fileName: string): Promise<string> {
    return this.minio.presignedGetObject(this.bucketName, fileName);
  }
}
