import { GoogleCalendarService } from 'src/calendar/application';
import { GoogleCalendars } from './decorator';
import { Get } from '@nestjs/common';

@GoogleCalendars()
export class GoogleCalendarResource {
  constructor(private readonly googleCalendarService: GoogleCalendarService) {}

  @Get('auth')
  async googleAuth() {
    return await this.googleCalendarService.googleAuth();
  }
}
