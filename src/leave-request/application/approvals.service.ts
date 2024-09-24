import { Injectable } from '@nestjs/common';
import { ApprovalsRepository } from '../port/persistence/approvals.repository';
import { Approval } from '../domain';
import { LeaveRequestRepository } from '../port/persistence/leave-request.repository';
import { LeaveCountService } from 'src/profile/application';
import { ApprovalStatus } from '../domain/enum';
import { LeaveRequestService } from './leave-request.service';

@Injectable()
export class ApprovalsService {
  constructor(
    private readonly approvalsRepo: ApprovalsRepository,
    private readonly leaveRequestRepo: LeaveRequestRepository,
    private readonly leaveCountService: LeaveCountService,
    private readonly leaveRequestService: LeaveRequestService,
  ) {}

  async approve(leaveRequestId: string, approvalId: string) {
    const request = await this.leaveRequestRepo.findById(leaveRequestId);
    const approval = request.approvals.find(
      (approval) => approval.approver.id === approvalId,
    );
    Approval.approve(approval);

    await this.approvalsRepo.update(approval.id, approval);

    const approvalStatus = request.approvals.every(
      (approval) => approval.status === 'approved',
    );

    if (approvalStatus) {
      await this.leaveCountService.addCount(
        request.employee.id,
        request.type,
        request.daysCount,
      );
      await this.leaveRequestRepo.update(request.id, {
        status: ApprovalStatus.APPROVED,
      });
    }

    return await this.leaveRequestService.getLeaveByApprover(
      approval.approver.id,
    );
  }

  async reject(leaveRequestId: string, approverId: string) {
    const request = await this.leaveRequestRepo.findById(leaveRequestId);
    const approval = request.approvals.find(
      (approval) => approval.approver.id === approverId,
    );

    Approval.reject(approval);

    await this.approvalsRepo.update(approval.id, approval);

    const approvalStatus = request.approvals.every(
      (approval) => approval.status === 'rejected',
    );

    if (approvalStatus) {
      await this.leaveRequestRepo.update(request.id, {
        status: ApprovalStatus.REJECTED,
      });
    }

    return await this.leaveRequestService.getLeaveByApprover(
      approval.approver.id,
    );
  }
}
