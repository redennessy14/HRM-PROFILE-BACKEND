import { applyDecorators, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Auth } from 'src/common/decorator';
import { CreateLeaveRequestDto } from '../dto';
import { ForbiddenResponse } from './common.decorator';

export const CreateLeaveRequestDecorator = () => {
  return applyDecorators(
    Auth(),
    Post(),
    ApiOperation({ summary: 'Создание новой заявки на отпуск' }),
    ApiBody({
      description: 'Данные для создания заявки на отпуск',
      type: CreateLeaveRequestDto,
    }),
    ApiCreatedResponse({ description: 'Заявка на отпуск успешно создана' }),
    ApiBadRequestResponse({ description: 'Неверные данные' }),
    ForbiddenResponse(),
  );
};
