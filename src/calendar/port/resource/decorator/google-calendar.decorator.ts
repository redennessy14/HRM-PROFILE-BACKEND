import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const GoogleCalendars = () =>
  applyDecorators(ApiTags('Гугл календарь'), Controller('google-calendars'));
