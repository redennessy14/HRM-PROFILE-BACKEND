import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const Document = () =>
  applyDecorators(ApiTags('Документы пользователей'), Controller('documents'));
