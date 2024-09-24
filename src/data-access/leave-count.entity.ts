import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Entity({ name: 'leave_counts' })
export class LeaveCountEntity {
  @PrimaryColumn({ name: 'employee_id' })
  employeeId: string;

  @Column({
    name: 'vacation_days',
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: 0,
  })
  vacationDays: number;

  @Column({ name: 'hospital_days', default: 0 })
  hospitalDays: number;

  @Column({ name: 'family_days', default: 0 })
  familyDays: number;

  @Column({ name: 'day_off', default: 0 })
  dayOff: number;

  @Column({ name: 'used_days', default: 0 })
  usedDays: number;

  @OneToOne(() => ProfileEntity, (employee) => employee.leaveCounts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'employee_id' })
  employee: ProfileEntity;
}
