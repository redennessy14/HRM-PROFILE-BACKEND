import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { ProfileEntity } from 'src/data-access/profile.entity';
import { Profile } from 'src/profile/domain/profile/profile';
import { Repository } from 'typeorm';
import { ProfileMapper } from './mapper/profile.mapper';

@Injectable()
export class ProfileRepository {
  constructor(
    @InjectRepository(ProfileEntity)
    private employeeRepository: Repository<ProfileEntity>,
  ) {}

  async findById(id: string) {
    const profile = await this.employeeRepository.findOne({
      where: { id },
      relations: ['leaveCounts'],
    });
    return profile;
  }

  async findAll() {
    const profile = await this.employeeRepository.find();

    return plainToInstance(ProfileEntity, profile);
  }

  async findByEmail(email: string) {
    const lowerEmail = email.toLowerCase();
    const profile = this.employeeRepository.findOne({
      where: { email: lowerEmail },
      relations: ['leaveCounts'],
    });
    return profile;
  }

  async save(employee: Profile) {
    const profileEntity = ProfileMapper.toPersistence(employee);
    const profile = await this.employeeRepository.save(profileEntity);
    return plainToInstance(ProfileEntity, profile);
  }

  async update(id: string, employee: Partial<ProfileEntity>) {
    await this.employeeRepository.update(id, employee);
    const updatedEmpployee = this.findById(id);
    return plainToInstance(ProfileEntity, updatedEmpployee);
  }

  async changePassword(id: string, password: string) {
    await this.employeeRepository.update(id, { password: password });
    const updatedEmpployee = this.findById(id);
    return plainToInstance(ProfileEntity, updatedEmpployee);
  }
}
