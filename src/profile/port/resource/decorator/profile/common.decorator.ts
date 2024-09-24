import { applyDecorators } from '@nestjs/common';
import { ApiForbiddenResponse } from '@nestjs/swagger';

export const ForbiddenResponse = () =>
  applyDecorators(
    ApiForbiddenResponse({
      description: 'У Вас нет прав совершать данное действие',
    }),
  );
