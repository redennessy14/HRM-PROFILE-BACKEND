import { Param } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorator';
import { ApprovalsService } from 'src/leave-request/application';
import { Approvals, ApprovalsApprove, ApprovalsReject } from './decorator';

@Approvals()
export class ApprovalsResource {
  constructor(private approvalsService: ApprovalsService) {}

  @ApprovalsApprove()
  approve(
    @Param('id') leaveRequestId: string,
    @CurrentUser('id') approverId: string,
  ) {
    return this.approvalsService.approve(leaveRequestId, approverId);
  }

  @ApprovalsReject()
  reject(
    @Param('id') leaveRequestId: string,
    @CurrentUser('id') approvalId: string,
  ) {
    return this.approvalsService.reject(leaveRequestId, approvalId);
  }
}
