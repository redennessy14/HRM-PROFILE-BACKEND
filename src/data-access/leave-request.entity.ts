import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApprovalStatus, LeaveType } from 'src/leave-request/domain/enum';
import { ApprovalEntity } from './approval.entity';
import { ProfileEntity } from './profile.entity';

@Entity({
  name: 'leave_request',
})
export class LeaveRequestEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: LeaveType,
  })
  type: LeaveType;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ name: 'days_count' })
  daysCount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @ManyToOne(() => ProfileEntity, (employee) => employee.leaveRequests)
  employee: ProfileEntity;

  @Column({
    type: 'enum',
    enum: ApprovalStatus,
    default: ApprovalStatus.PENDING,
  })
  status: ApprovalStatus;

  @ManyToMany(() => ApprovalEntity, (approval) => approval.leaveRequests)
  @JoinTable({
    name: 'leave_request_approvals',
    joinColumn: {
      name: 'leave_request_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'approver_id',
      referencedColumnName: 'id',
    },
  })
  approvals: ApprovalEntity[];
}
