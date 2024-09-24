import { applyDecorators, Get } from '@nestjs/common';
import { ForbiddenResponse } from './common.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator';

export const GetAllLeave = () => {
  return applyDecorators(
    Auth(),
    Get(),
    ApiOperation({ summary: 'Получение всех заявок на отпуск пользователя' }),
    ApiResponse({
      status: 200,
      description: 'Список заявок на отпуск',
    }),
    ForbiddenResponse(),
  );
};
