import { applyDecorators, Post, UseInterceptors } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Auth } from 'src/common/decorator';
import { ForbiddenResponse } from '../profile';
import { FileInterceptor } from '@nestjs/platform-express';

export const AddDocumentDecorator = () =>
  applyDecorators(
    Auth(),
    Post(':id'),
    UseInterceptors(FileInterceptor('file')),
    ApiOperation({ summary: 'Добавление документа' }),
    ApiCreatedResponse({ description: 'Документ добавлен' }),
    ApiBadRequestResponse({ description: 'Неверные данные' }),
    ForbiddenResponse(),
  );
