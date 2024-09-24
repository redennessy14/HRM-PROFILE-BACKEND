import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';
import { UpdateProfileDTO as IUpdateProfileDTO } from 'src/profile/application/dto/profile';

export class UpdateProfileDTO implements IUpdateProfileDTO {
  @ApiPropertyOptional({
    description: 'Имя сотрудника',
    maxLength: 30,
    example: 'Иван',
  })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  firstName?: string;

  @ApiPropertyOptional({
    description: 'Фамилия сотрудника',
    maxLength: 30,
    example: 'Иванов',
  })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  lastName?: string;

  @ApiPropertyOptional({
    description: 'Электронная почта сотрудника',
    maxLength: 30,
    example: 'ivan.ivanov@example.com',
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(30)
  email?: string;

  @ApiPropertyOptional({
    description: 'Био сотрудника',
    maxLength: 1000,
    example: 'Я опытный разработчик с 5-летним стажем работы.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  aboutMe?: string;

  @ApiPropertyOptional({
    description: 'Роль сотрудника',
    maxLength: 30,
    example: 'Developer',
  })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  role?: string;

  @ApiPropertyOptional({
    description: 'Дата рождения сотрудника в формате дд/мм/гггг',
    example: '01/01/1990',
  })
  @IsOptional()
  @IsString()
  birthday?: string;

  @ApiPropertyOptional({
    description: 'Телефон сотрудника',
    maxLength: 20,
    example: '+996500969966',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;
}
