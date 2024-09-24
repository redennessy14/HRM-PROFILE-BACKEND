import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApprovalEntity, ProfileEntity } from 'src/data-access';
import { Approval } from 'src/leave-request/domain';
import { Repository } from 'typeorm';
import { ApprovalMapper } from './mapper';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ApprovalsRepository {
  constructor(
    @InjectRepository(ApprovalEntity)
    private approvalRepository: Repository<ApprovalEntity>,
  ) {}

  async findById(id: string) {
    const approval = await this.approvalRepository.findOne({
      where: { id },
      relations: ['approver'],
    });
    return plainToClass(ProfileEntity, approval);
  }

  async save(
    approval: Approval,
    employee: ProfileEntity,
  ): Promise<ApprovalEntity> {
    const approvalEntity = ApprovalMapper.toPersistence(approval, employee);
    return await this.approvalRepository.save(approvalEntity);
  }

  async update(id: string, status: Partial<ApprovalEntity>) {
    await this.approvalRepository.update(id, status);
    return await this.findById(id);
  }
}
