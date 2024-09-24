import { Injectable } from '@nestjs/common';
import { GoogleService } from 'src/common/lib/google';

@Injectable()
export class GoogleCalendarService {
  constructor(private readonly google: GoogleService) {}

  async googleAuth() {
    return this.google.getAuthUrl();
  }
}
