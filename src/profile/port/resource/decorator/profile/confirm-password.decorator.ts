import { applyDecorators, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export const ConfirmPasswordDecorator = () =>
  applyDecorators(
    Post('password/:confirmation_token/confirm'),
    ApiOperation({ summary: 'Изменение пароля по ссылке ' }),
  );
