import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LeaveCountEntity } from 'src/data-access';
import { LeaveCount } from 'src/profile/domain/leave-count';

import { Repository } from 'typeorm';
import { LeaveCountMapper } from './mapper/leave-count.mapper';

@Injectable()
export class LeaveCountRepository {
  constructor(
    @InjectRepository(LeaveCountEntity)
    private leaveCountRepository: Repository<LeaveCountEntity>,
  ) {}

  async findByEmployeeId(employeeId: string): Promise<LeaveCount> {
    const leaveCountEntity = await this.leaveCountRepository.findOne({
      where: { employeeId: employeeId },
    });
    return LeaveCountMapper.toDomain(leaveCountEntity);
  }

  async findAll(): Promise<LeaveCountEntity[]> {
    return await this.leaveCountRepository.find();
  }

  async save(leaveCount: LeaveCount) {
    const leaveCountEntity = LeaveCountMapper.toPersistence(leaveCount);
    return await this.leaveCountRepository.save(leaveCountEntity);
  }

  async update(employeeId: string, leaveCount: LeaveCountEntity) {
    return await this.leaveCountRepository.update(employeeId, leaveCount);
  }

  async updateCount(employeeId: string, leaveCount: LeaveCount) {
    const leaveCountEntity = LeaveCountMapper.toPersistence(leaveCount);
    return await this.leaveCountRepository.update(employeeId, leaveCountEntity);
  }
}
