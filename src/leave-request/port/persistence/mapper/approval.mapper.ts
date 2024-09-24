import { ApprovalEntity, ProfileEntity } from 'src/data-access';
import { Approval, Employee } from 'src/leave-request/domain';

export class ApprovalMapper {
  static toPersistence(
    approval: Approval,
    approverEntity: ProfileEntity,
  ): ApprovalEntity {
    const approvalEntity = new ApprovalEntity();
    approvalEntity.id = approval.id;
    approvalEntity.approver = approverEntity;
    approvalEntity.status = approval.status;
    return approvalEntity;
  }

  static toDomain(approvalEntity: ApprovalEntity): Approval {
    const approver = new Employee(approvalEntity.approver.id);
    return new Approval(approver);
  }
}
