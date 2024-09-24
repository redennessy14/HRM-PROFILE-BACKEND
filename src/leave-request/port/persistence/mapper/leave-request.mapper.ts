import { Approval, LeaveRequest } from 'src/leave-request/domain/leave-request';

import { Period } from 'src/leave-request/domain/value';
import {
  ApprovalEntity,
  ProfileEntity,
  LeaveRequestEntity,
} from 'src/data-access';
import { Employee } from 'src/leave-request/domain';

export class LeaveRequestMapper {
  static toPersistence(
    leaveRequest: LeaveRequest,
    employeeEntity: ProfileEntity,
    approvalEntities: ApprovalEntity[],
  ): LeaveRequestEntity {
    const leaveRequestEntity = new LeaveRequestEntity();
    leaveRequestEntity.id = leaveRequest.id;
    leaveRequestEntity.type = leaveRequest.type;
    leaveRequestEntity.startDate = leaveRequest.period.start;
    leaveRequestEntity.endDate = leaveRequest.period.end;
    leaveRequestEntity.daysCount = leaveRequest.period.daysCount;
    leaveRequestEntity.employee = employeeEntity;
    leaveRequestEntity.approvals = approvalEntities;
    return leaveRequestEntity;
  }

  static toDomain(
    leaveRequestEntity: LeaveRequestEntity,
    employee: Employee,
    approvals: Approval[],
  ): LeaveRequest {
    const period = new Period(
      leaveRequestEntity.startDate,
      leaveRequestEntity.endDate,
    );

    return new LeaveRequest(
      employee,
      leaveRequestEntity.type,
      period,
      approvals,
    );
  }
}
