import { applyDecorators, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator';
import { ForbiddenResponse } from './common.decorator';

export const UpdateProfileDecorator = () =>
  applyDecorators(
    Auth(),
    Patch(':id'),
    ApiOperation({ summary: 'Обновление информации о сотруднике по ID' }),
    ApiResponse({
      status: 200,
      description: 'Информация о сотруднике обновлена',
    }),
    ForbiddenResponse(),
  );
