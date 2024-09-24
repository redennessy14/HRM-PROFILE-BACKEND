import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    description: 'Электронная почта пользователя',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Пароль пользователя. Должен содержать не менее 6 знаков',
    example: 'password123',
  })
  @MinLength(6, {
    message: 'Пароль должен содержать не менее 6 знаков',
  })
  @IsString()
  @MinLength(6, {
    message: 'Пароль должен содержать не менее 6 знаков',
  })
  password: string;
}
