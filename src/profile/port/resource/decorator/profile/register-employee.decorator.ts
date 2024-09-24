import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { Auth } from 'src/common/decorator';
import { ForbiddenResponse } from './common.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { RegisterProfileDto } from '../../dto/profile/register-profile.dto';
import { CheckEmailExistencePipe } from '../../pipe';

enum DocumentTypeKeys {
  PASSPORT = 'passport',
  EMPLOYMENT_CONTRACT = 'employment_contract',
  RESUME = 'resume',
}

const documentField = [
  DocumentTypeKeys.PASSPORT,
  DocumentTypeKeys.EMPLOYMENT_CONTRACT,
  DocumentTypeKeys.RESUME,
].map((key) => ({ name: key, maxCount: 1 }));

export const RegisterEmployeeDecorator = () =>
  applyDecorators(
    Auth(),
    Post(),
    UsePipes(CheckEmailExistencePipe),
    UseInterceptors(FileFieldsInterceptor(documentField)),
    ApiConsumes('multipart/form-data'),
    ApiOperation({ summary: 'Регистрация нового сотрудника' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
            description: 'Имя сотрудника',
            example: 'Иван',
          },
          lastName: {
            type: 'string',
            description: 'Фамилия сотрудника',
            example: 'Иванов',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Электронная почта сотрудника',
            example: 'ivan.ivanov@example.com',
          },
          hiredAt: {
            type: 'string',
            description: 'Дата приема сотрудника в формате дд/мм/гггг',
            example: '01/01/2024',
          },
          [DocumentTypeKeys.PASSPORT]: {
            type: 'string',
            format: 'binary',
            description: 'Паспорт сотрудника',
          },
          [DocumentTypeKeys.RESUME]: {
            type: 'string',
            format: 'binary',
            description: 'Резюме сотрудника',
          },
          [DocumentTypeKeys.EMPLOYMENT_CONTRACT]: {
            type: 'string',
            format: 'binary',
            description: 'Договор сотрудника',
          },
        },
      },
    }),

    ApiCreatedResponse({
      description: 'Сотрудник зарегистрирован',
      type: RegisterProfileDto,
    }),
    ApiBadRequestResponse({ description: 'Неверные данные' }),
    ForbiddenResponse(),
  );

export const Blank = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): RegisterProfileDto => {
    const req = ctx.switchToHttp().getRequest();

    const employeeData = req.body;

    const entriesOfFiles = Object.entries(req.files).map(
      ([entry, fileArray]) => [entry, fileArray[0]],
    );

    const documentFiles = Object.fromEntries(entriesOfFiles);

    return {
      firstName: employeeData.firstName,
      lastName: employeeData.lastName,
      email: employeeData.email,
      hiredAt: employeeData.hiredAt,
      passport: documentFiles[DocumentTypeKeys.PASSPORT],
      resume: documentFiles[DocumentTypeKeys.RESUME],
      employmentContract: documentFiles[DocumentTypeKeys.EMPLOYMENT_CONTRACT],
    };
  },
);
