import { applyDecorators, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export const VerifyTokenDecorator = () =>
  applyDecorators(
    Post(':confirmation_token/verify'),
    ApiOperation({ summary: 'Проверка действительности токена ' }),
  );
