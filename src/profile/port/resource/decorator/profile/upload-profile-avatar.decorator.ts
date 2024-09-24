import { applyDecorators, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator';

export const UploadProfileAvatarDecorator = () =>
  applyDecorators(
    Auth(),
    Post('avatar/:id'),
    UseInterceptors(FileInterceptor('file')),
    ApiOperation({ summary: 'Загрузка аватара пользователя' }),
  );
