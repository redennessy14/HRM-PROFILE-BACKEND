import { applyDecorators, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Auth } from 'src/common/decorator';
import { ForbiddenResponse } from './common.decorator';

export const GetLeaveById = () => {
  return applyDecorators(
    Auth(),
    Get(':id'),
    ApiOperation({ summary: 'Получение заявки на отпуск по Id сотрудника' }),
    ApiResponse({
      status: 200,
      description: 'Информация о заявке на отпуск',
    }),
    ApiBadRequestResponse({ description: 'Неверные данные' }),
    ForbiddenResponse(),
  );
};
