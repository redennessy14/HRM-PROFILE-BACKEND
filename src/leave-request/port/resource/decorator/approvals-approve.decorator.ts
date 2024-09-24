import { applyDecorators, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Auth } from 'src/common/decorator';
import { ForbiddenResponse } from './common.decorator';

export const ApprovalsApprove = () =>
  applyDecorators(
    Auth(),
    Post(':id/approve'),
    ApiOperation({ summary: 'Одобрение заявки на отпуск' }),
    ApiCreatedResponse({ description: 'Заявка на отпуск одобрена успешно' }),
    ApiBadRequestResponse({ description: 'Неверные данные' }),
    ForbiddenResponse(),
  );
