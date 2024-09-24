import { LeaveCountEntity } from 'src/data-access';
import { LeaveCount } from 'src/profile/domain/leave-count';

export class LeaveCountMapper {
  static toPersistence(leaveCount: LeaveCount): LeaveCountEntity {
    const leaveCountEntity = new LeaveCountEntity();
    leaveCountEntity.employeeId = leaveCount.employeeId;
    leaveCountEntity.vacationDays = leaveCount.getVacationDays();
    leaveCountEntity.hospitalDays = leaveCount.getHospitalDays();
    leaveCountEntity.familyDays = leaveCount.getFamilyDays();
    leaveCountEntity.dayOff = leaveCount.getDayOff();
    leaveCountEntity.usedDays = leaveCount.getUsedDays();
    return leaveCountEntity;
  }

  static toDomain(leaveCount: LeaveCountEntity): LeaveCount {
    return new LeaveCount(
      leaveCount.employeeId,
      leaveCount.vacationDays,
      leaveCount.hospitalDays,
      leaveCount.familyDays,
      leaveCount.dayOff,
      leaveCount.usedDays,
    );
  }

  static toDomainArray(leaveCounts: LeaveCountEntity[]): LeaveCount[] {
    return leaveCounts.map(
      (leaveCount) =>
        new LeaveCount(
          leaveCount.employeeId,
          leaveCount.vacationDays,
          leaveCount.hospitalDays,
          leaveCount.familyDays,
          leaveCount.dayOff,
          leaveCount.usedDays,
        ),
    );
  }
}
