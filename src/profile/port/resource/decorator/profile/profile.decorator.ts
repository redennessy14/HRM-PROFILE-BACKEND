import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const Profile = () =>
  applyDecorators(ApiTags('Профиль пользователя'), Controller('profiles'));
