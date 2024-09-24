import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ChangePasswordDTO as IChangePasswordDTO } from 'src/profile/application/dto/profile';

export class ChangePasswordDTO implements IChangePasswordDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  newPassword: string;
}
