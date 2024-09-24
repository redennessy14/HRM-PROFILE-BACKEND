import { AggregateRoot } from '@nestjs/cqrs';
import { ApprovalStatus, LeaveType } from './enum';
import { Period } from './value';
import { ApprovalEvent } from './event/approval.event';
import { differenceInHours, differenceInMonths } from 'date-fns';
import { ProfileEntity, LeaveRequestEntity } from 'src/data-access';
import { ForbiddenException } from '@nestjs/common';
import { Employee } from './employee';
import { parseDate } from 'src/common/utils';

export class Approval {
  readonly id: string;
  readonly approver: Employee;
  status: ApprovalStatus;

  constructor(approver: Employee) {
    this.approver = approver;
    this.status = ApprovalStatus.PENDING;
  }

  static New(approver: Employee): Approval {
    return new Approval(approver);
  }

  static approve(approval: Approval) {
    approval.status = ApprovalStatus.APPROVED;
  }

  static reject(approval: Approval) {
    approval.status = ApprovalStatus.REJECTED;
  }
}

export class LeaveRequest extends AggregateRoot {
  readonly id: string;
  readonly employee: Employee;
  readonly type: LeaveType;
  readonly period: Period;
  readonly approvals: Approval[];
  status: ApprovalStatus;

  constructor(
    employee: Employee,
    type: LeaveType,
    period: Period,
    approvals: Approval[],
  ) {
    super();
    this.employee = employee;
    this.type = type;
    this.period = period;
    this.approvals = approvals;
    this.status = ApprovalStatus.PENDING;
  }

  static New = (
    employee: Employee,
    period: Period,
    type: LeaveType,
    approvals: Approval[],
  ) => {
    return new LeaveRequest(employee, type, period, approvals);
  };

  approveLeaveRequest(id: string) {
    this.apply(new ApprovalEvent(id));
  }

  static checkLeaveRequest(requests: LeaveRequestEntity[]) {
    const now = new Date();
    const recentRequest = requests.some((request) => {
      const hoursDifference = differenceInHours(now, request.createdAt);
      return hoursDifference <= 24;
    });
    if (recentRequest) {
      throw new ForbiddenException(
        'Вы уже подали заявление за последние 24 часа',
      );
    }
    return;
  }

  static validateLeaveRequest(startDate: Date, type: string, hireDate: string) {
    const hire = parseDate(hireDate);

    const monthsCount = differenceInMonths(startDate, hire);

    switch (type) {
      case LeaveType.VACATION:
        if (monthsCount < 6) {
          throw new ForbiddenException(
            'Отпуск можно запросить только после 6 месяцев работы',
          );
        }
      case LeaveType.FAMILY:
        if (monthsCount < 3) {
          throw new ForbiddenException(
            'День семьи можно запросить только после 3 месяцев работы',
          );
        }
      case LeaveType.HOSPITAL:
        if (monthsCount < 3) {
          throw new ForbiddenException(
            'Больничный можно запросить только после 3 месяцев работы',
          );
        }
      case LeaveType.DAY_OFF:
        if (monthsCount < 3) {
          throw new ForbiddenException(
            'Отпуск без содержания можно запросить только после 3 месяцев работы',
          );
        }
    }
  }

  static checkEmployeeLeaveCount(
    employee: ProfileEntity,
    type: LeaveType,
    leaveCount: number,
  ) {
    switch (type) {
      case LeaveType.VACATION:
        if (employee.leaveCounts.vacationDays < leaveCount) {
          throw new ForbiddenException('Недостаточно дней отпуска');
        }
        break;

      case LeaveType.HOSPITAL:
        if (employee.leaveCounts.hospitalDays < leaveCount) {
          throw new ForbiddenException('Недостаточно больничных дней');
        }
        break;

      case LeaveType.FAMILY:
        if (employee.leaveCounts.familyDays < leaveCount) {
          throw new ForbiddenException('Недостаточно дней семьи');
        }
        break;

      case LeaveType.DAY_OFF:
        break;

      default:
        throw new ForbiddenException(`Неизвестный тип отпуска: ${type}`);
    }
    return employee;
  }
}
