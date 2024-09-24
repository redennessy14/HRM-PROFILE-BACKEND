import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApprovalsRepository } from './approvals.repository';
import { plainToInstance } from 'class-transformer';
import {
  ApprovalEntity,
  ProfileEntity,
  LeaveRequestEntity,
} from 'src/data-access';
import { LeaveRequest } from 'src/leave-request/domain';
import { LeaveRequestMapper } from './mapper';
import { ApprovalStatus } from 'src/leave-request/domain/enum';

@Injectable()
export class LeaveRequestRepository {
  constructor(
    @InjectRepository(LeaveRequestEntity)
    private leaveRequestRepo: Repository<LeaveRequestEntity>,
    private approvalRepo: ApprovalsRepository,
  ) {}

  async findAll() {
    const requests = await this.leaveRequestRepo.find({
      relations: ['employee', 'approvals', 'approvals.approver'],
    });
    return plainToInstance(LeaveRequestEntity, requests);
  }

  async findUpcomingAbsences() {
    const approvedAbsences = await this.leaveRequestRepo.find({
      where: {
        status: ApprovalStatus.APPROVED,
      },
      relations: ['employee'],
    });

    return plainToInstance(LeaveRequestEntity, approvedAbsences);
  }

  async findById(id: string) {
    const request = await this.leaveRequestRepo.findOne({
      where: { id },
      relations: ['employee', 'approvals', 'approvals.approver'],
    });

    return plainToInstance(LeaveRequestEntity, request);
  }

  async findByEmployeeId(id: string) {
    const request = await this.leaveRequestRepo.find({
      where: {
        employee: { id },
      },
      relations: ['employee', 'approvals', 'approvals.approver'],
    });
    return plainToInstance(LeaveRequestEntity, request);
  }

  async findLeaveByApprover(approverId: string) {
    const requests = await this.leaveRequestRepo.find({
      relations: ['approvals', 'employee', 'approvals.approver'],
      where: {
        approvals: {
          approver: {
            id: approverId,
          },
        },
      },
    });
    return plainToInstance(LeaveRequestEntity, requests);
  }

  async save(
    leaveRequest: LeaveRequest,
    employee: ProfileEntity,
    approval: ApprovalEntity[],
  ) {
    const entity = LeaveRequestMapper.toPersistence(
      leaveRequest,
      employee,
      approval,
    );
    const request = await this.leaveRequestRepo.save(entity);
    return plainToInstance(LeaveRequestEntity, request);
  }

  async update(id: string, leaveRequest: Partial<LeaveRequestEntity>) {
    await this.leaveRequestRepo.update(id, leaveRequest);
    return await this.findById(id);
  }
}
