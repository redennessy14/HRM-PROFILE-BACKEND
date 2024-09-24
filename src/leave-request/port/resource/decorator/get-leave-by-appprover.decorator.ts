import { applyDecorators, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator';
import { ForbiddenResponse } from './common.decorator';

export const GetLeaveByApprover = () => {
  return applyDecorators(
    Auth(),
    Get('approver/:id'),
    ApiOperation({
      summary: 'Получение заявок где сотрудник является утвердителем ',
    }),
    ApiResponse({
      status: 200,
      description: 'Список заявок на отпуск',
    }),
    ForbiddenResponse(),
  );
};
