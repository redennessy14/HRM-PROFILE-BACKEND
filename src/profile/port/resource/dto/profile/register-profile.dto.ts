import { ApiProperty } from '@nestjs/swagger';

export type File = Express.Multer.File;

export class RegisterProfileDto {
  @ApiProperty({
    description: 'Имя сотрудника',
    example: 'Иван',
  })
  firstName: string;

  @ApiProperty({
    description: 'Фамилия сотрудника',
    example: 'Иванов',
  })
  lastName: string;
  @ApiProperty({
    description: 'Электронная почта сотрудника',
    example: 'ivan.ivanov@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Дата приема сотрудника в формате дд/мм/гггг',
    example: '01/01/2024',
  })
  hiredAt: string;

  passport: File;
  employmentContract: File;
  resume: File;
}
