import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { ProfileRepository } from '../../persistence/profile.repository';
import { RegisterProfileDto } from '../dto/profile';

@Injectable()
export class CheckEmailExistencePipe implements PipeTransform {
  constructor(private readonly profileRepo: ProfileRepository) {}

  async transform(registerProfileDto: RegisterProfileDto) {
    const existingProfile = await this.profileRepo.findByEmail(
      registerProfileDto.email,
    );
    if (existingProfile) {
      throw new BadRequestException('Профиль с данной почтой уже существует');
    }
    return registerProfileDto;
  }
}
