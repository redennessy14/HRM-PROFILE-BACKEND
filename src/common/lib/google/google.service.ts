import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { docs_v1, google } from 'googleapis';
import { GoogleOptions } from './google.options';

@Injectable()
export class GoogleService {
  private oauth2Client: OAuth2Client;
  constructor(private option: GoogleOptions) {
    this.oauth2Client = new google.auth.OAuth2(option);
  }

  getAuthUrl() {
    const scopes = ['https://www.googleapis.com/auth/calendar'];
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });
  }

  async getAccessToken(code: string): Promise<string> {
    const { tokens } = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials(tokens);
    return tokens.access_token;
  }

  async createDocument(title: string): Promise<any> {
    const docs = google.docs({ version: 'v1', auth: this.oauth2Client });
    const response = await docs.documents.create({
      requestBody: {
        title,
      },
    });
    return response.data;
  }

  async updateDocument(
    fileId: string,
    updates: docs_v1.Schema$BatchUpdateDocumentRequest,
  ): Promise<void> {
    const docs = google.docs({ version: 'v1', auth: this.oauth2Client });
    await docs.documents.batchUpdate({
      documentId: fileId,
      requestBody: updates,
    });
  }
}
