import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ConfirmPasswordDTO as IConfirmPasswordDTO } from 'src/profile/application/dto/profile';

export class ConfirmPasswordDTO implements IConfirmPasswordDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
