import { applyDecorators, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator';
import { ForbiddenResponse } from './common.decorator';

export const GetAllProfilesDecorator = () =>
  applyDecorators(
    Auth(),
    Get(),
    ApiOperation({ summary: 'Получение всех сотрудников' }),
    ApiResponse({ status: 200, description: 'Список сотрудников' }),
    ForbiddenResponse(),
  );
