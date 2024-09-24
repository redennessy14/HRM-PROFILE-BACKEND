import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LeaveCountService } from './leave-count.service';

@Injectable()
export class LeaveCountTask {
  constructor(private readonly leaveCountService: LeaveCountService) {}

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async updateVacationsDays() {
    await this.leaveCountService.addVacationDays();
  }

  @Cron(CronExpression.EVERY_YEAR)
  async updateHospitalDays() {
    await this.leaveCountService.addHospitalDays();
  }

  @Cron(CronExpression.EVERY_QUARTER)
  async updateFamilyDays() {
    await this.leaveCountService.addFamilyDays();
  }
}
