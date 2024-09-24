import { applyDecorators, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Auth } from 'src/common/decorator';
import { ForbiddenResponse } from './common.decorator';

export const GetUpcomingAbsences = () => {
  return applyDecorators(
    Auth(),
    Get('/absences'),
    ApiOperation({ summary: 'Получение ближайших отсутствий коллег' }),
    ApiResponse({
      status: 200,
      description: 'Информация о ближайших отсутствий коллег',
    }),
    ApiBadRequestResponse({ description: 'Неверные данные' }),
    ForbiddenResponse(),
  );
};
