import { applyDecorators, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator';
import { ForbiddenResponse } from './common.decorator';

export const GetProfileByIdDecorator = () =>
  applyDecorators(
    Auth(),
    Get(':id'),
    ApiOperation({ summary: 'Получение информации о сотруднике по Id' }),
    ForbiddenResponse(),
  );
