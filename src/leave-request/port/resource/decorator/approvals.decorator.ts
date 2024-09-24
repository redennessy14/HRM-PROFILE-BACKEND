import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const Approvals = () =>
  applyDecorators(ApiTags('Утвердители'), Controller('approvals'));
