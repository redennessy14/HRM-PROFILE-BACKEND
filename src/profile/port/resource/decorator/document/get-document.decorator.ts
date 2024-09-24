import { applyDecorators, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator';
import { ForbiddenResponse } from '../profile/common.decorator';

export const GetDocumentDecorator = () =>
  applyDecorators(
    Auth(),
    Get(':id'),
    ApiOperation({ summary: 'Получение документа' }),
    ForbiddenResponse(),
  );
