import { applyDecorators, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Auth } from 'src/common/decorator';
import { ForbiddenResponse } from './common.decorator';

export const ApprovalsReject = () =>
  applyDecorators(
    Auth(),
    Post(':id/reject'),
    ApiOperation({ summary: 'Отклонение заявки на отпуск' }),
    ApiCreatedResponse({ description: 'Заявка на отпуск отклонена успешно' }),
    ApiBadRequestResponse({ description: 'Неверные данные' }),
    ForbiddenResponse(),
  );
