import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const LeaveRequests = () =>
  applyDecorators(
    ApiTags('Форма запроса на отгул'),
    Controller('leave-requests'),
  );
