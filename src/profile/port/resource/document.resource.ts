import { DocumentService } from 'src/profile/application';
import {
  AddDocumentDecorator,
  Document,
  GetDocumentDecorator,
} from './decorator/document';
import { Body, Param, Query, UploadedFile } from '@nestjs/common';
import { DocumentType } from 'src/profile/domain/enum';

@Document()
export class DocumentResource {
  constructor(private documentService: DocumentService) {}

  @GetDocumentDecorator()
  async getDocument(
    @Param('id') id: string,
    @Query('type') type?: DocumentType,
  ) {
    return await this.documentService.getDocument(id, type);
  }

  @AddDocumentDecorator()
  async addDocument(
    @Param('id') id: string,
    @Body('type') type: DocumentType,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.documentService.addDocument(id, type, file);
  }

  // @Post('google')
  // async createDocument(@Body('title') title: string) {
  //   return await this.documentService.createGoogleDocument(title);
  // }

  // @Get('google/auth')
  // async googleAuth() {
  //   const authUrl = await this.documentService.getGoogleAuthUrl();
  //   return { url: authUrl };
  // }

  // @Get('google/callback')
  // async handleGoogleCallback(@Query('code') code: string) {
  //   const accessToken = await this.documentService.getAccessToken(code);
  //   return { accessToken };
  // }
}
