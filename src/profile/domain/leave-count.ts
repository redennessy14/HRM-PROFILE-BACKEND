import { AggregateRoot } from '@nestjs/cqrs';
import { differenceInMonths } from 'date-fns';
import { LeaveType } from 'src/leave-request/domain/enum';

export class LeaveCount extends AggregateRoot {
  readonly employeeId: string;
  vacationDays: number;
  hospitalDays: number;
  familyDays: number;
  dayOff: number;
  usedDays: number;

  constructor(
    employeeId: string,
    vacationDays: number,
    hospitalDays: number,
    familyDays?: number,
    dayOff?: number,
    usedDays?: number,
  ) {
    super();
    this.employeeId = employeeId;
    this.vacationDays = vacationDays;
    this.hospitalDays = hospitalDays;
    this.familyDays = familyDays || 1;
    this.dayOff = dayOff || 0;
    this.usedDays = usedDays || 0;
  }

  static New(employeeId: string, hireDate: Date): LeaveCount {
    const vacationDays = this.calculateVacationDays(hireDate);
    const hospitalDays = this.calculateHospitalDays(hireDate);
    return new LeaveCount(employeeId, vacationDays, hospitalDays);
  }

  static calculateVacationDays(hireDate: Date): number {
    const now = new Date();
    const totalMonth = differenceInMonths(now, hireDate);
    const totalDays = totalMonth * 2.33;
    return parseFloat(totalDays.toFixed(2));
  }

  static calculateHospitalDays(hireDate: Date): number {
    const now = new Date();
    const currentYear = now.getFullYear();
    const hireYear = hireDate.getFullYear();
    if (currentYear === hireYear) {
      const daysSinceHire =
        (now.getTime() - hireDate.getTime()) / (24 * 60 * 60 * 1000);

      const proportionalDays = (10 * daysSinceHire) / 365;
      return Math.max(0, Math.floor(proportionalDays));
    } else if (currentYear > hireYear) {
      return 10;
    }
    return 0;
  }

  getVacationDays(): number {
    return this.vacationDays;
  }

  getHospitalDays(): number {
    return this.hospitalDays;
  }

  getFamilyDays(): number {
    return this.familyDays;
  }

  getDayOff(): number {
    return this.dayOff;
  }

  getUsedDays(): number {
    return this.usedDays;
  }

  static updateCount(leaveCount: LeaveCount, type: string, count: number) {
    switch (type) {
      case LeaveType.VACATION:
        leaveCount.vacationDays -= count;
        leaveCount.usedDays += count;
        break;
      case LeaveType.HOSPITAL:
        leaveCount.hospitalDays -= count;
        leaveCount.usedDays += count;
        break;
      case LeaveType.FAMILY:
        leaveCount.familyDays -= count;
        leaveCount.usedDays += count;
        break;
      case LeaveType.DAY_OFF:
        leaveCount.dayOff += count;
        leaveCount.usedDays += count;
        break;
    }
  }
}
