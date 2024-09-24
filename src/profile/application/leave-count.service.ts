import { Injectable } from '@nestjs/common';
import { LeaveCountRepository } from '../port/persistence/leave-count.repository';
import { LeaveCountEntity } from 'src/data-access';
import { parseDate } from 'src/common/utils';
import { ProfileRepository } from '../port/persistence/profile.repository';
import { LeaveCount } from '../domain/leave-count';

@Injectable()
export class LeaveCountService {
  constructor(
    private readonly leaveCountRepo: LeaveCountRepository,
    private readonly profileRepo: ProfileRepository,
  ) {}

  async createLeaveCounts(employeeId: string): Promise<LeaveCountEntity> {
    const employee = await this.profileRepo.findById(employeeId);
    const leaveCount = LeaveCount.New(employeeId, parseDate(employee.hiredAt));
    return await this.leaveCountRepo.save(leaveCount);
  }

  async addVacationDays() {
    const leaveCounts = await this.leaveCountRepo.findAll();
    await Promise.all(
      leaveCounts.map(async (leaveCount) => {
        leaveCount.vacationDays = this.calculateVacationDaysFor(leaveCount);
        await this.leaveCountRepo.update(leaveCount.employeeId, leaveCount);
      }),
    );
  }
  async addHospitalDays() {
    const leaveCounts = await this.leaveCountRepo.findAll();
    await Promise.all(
      leaveCounts.map(async (leaveCounts) => {
        leaveCounts.hospitalDays = 10;
        await this.leaveCountRepo.update(leaveCounts.employeeId, leaveCounts);
      }),
    );
  }

  async addFamilyDays() {
    const leaveCounts = await this.leaveCountRepo.findAll();
    await Promise.all(
      leaveCounts.map(async (leaveCounts) => {
        leaveCounts.familyDays = 1;
        await this.leaveCountRepo.update(leaveCounts.employeeId, leaveCounts);
      }),
    );
  }

  async addCount(employeeId: string, type: string, count: number) {
    const leaveCount = await this.leaveCountRepo.findByEmployeeId(employeeId);
    LeaveCount.updateCount(leaveCount, type, count);
    await this.leaveCountRepo.updateCount(employeeId, leaveCount);
  }

  private calculateVacationDaysFor(leaveCount: LeaveCountEntity) {
    const vacationDays = Number(leaveCount.vacationDays);
    return vacationDays + 2.33;
  }
}
