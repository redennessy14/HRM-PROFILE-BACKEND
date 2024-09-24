import { applyDecorators, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export const ForgotPasswordDecorator = () =>
  applyDecorators(
    Post('password/forgot'),
    ApiOperation({ summary: 'Забыл пароль' }),
  );
