import { applyDecorators, Patch } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator';

export const ChangePasswordDecorator = () =>
  applyDecorators(
    Auth(),
    Patch('password'),
    ApiOperation({ summary: 'Изменение пароля' }),
  );
