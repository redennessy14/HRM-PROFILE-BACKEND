import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { ProfileRepository } from '../../persistence/profile.repository';

@Injectable()
export class ProfileExistencePipe implements PipeTransform {
  constructor(private readonly profileRepo: ProfileRepository) {}

  async transform(id: string) {
    const profile = await this.profileRepo.findById(id);

    if (!profile) {
      throw new NotFoundException('Профиль не найден');
    }

    return profile;
  }
}
