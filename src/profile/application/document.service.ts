import { Injectable } from '@nestjs/common';
import { DocumentRepository } from '../port/persistence/document.repository';
import { DocumentType } from '../domain/enum';
import { randomUUID } from 'crypto';
import { MediaService } from '../port/adapter/media.service';
import { Document } from '../domain/document/document';

@Injectable()
export class DocumentService {
  constructor(
    private readonly documentRepo: DocumentRepository,
    private media: MediaService,
  ) {}

  async getDocument(id: string, type: DocumentType) {
    const profileDocuments = await this.documentRepo.findById(id);
    const documentsWithUrls = await Promise.all(
      profileDocuments.map(async (document) => {
        const documentUrl = await this.media.getFileUrl(document.fileName);
        return {
          ...document,
          url: documentUrl,
        };
      }),
    );

    return documentsWithUrls;
  }

  async addDocument(
    profileId: string,
    type: DocumentType,
    file: Express.Multer.File,
  ) {
    const id = randomUUID();

    const fileName = await this.media.uploadFile(file);

    const document = Document.New(id, profileId, type, fileName);

    await this.documentRepo.save(document);

    return this.media.getFileUrl(fileName);
  }

  // async getGoogleAuthUrl() {
  //   return this.google.getAuthUrl();
  // }

  // async getAccessToken(code: string): Promise<string> {
  //   const token = await this.google.getAccessToken(code);

  //   return token;
  // }

  // async createGoogleDocument(title: string) {
  //   const { url } = await this.google.createDocument(title);
  //   return url;
  // }
}
