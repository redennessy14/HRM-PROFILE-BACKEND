import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LeaveRequestEntity } from './leave-request.entity';
import { ApprovalStatus } from 'src/leave-request/domain/enum';
import { ProfileEntity } from './profile.entity';

@Entity({
  name: 'approvals',
})
export class ApprovalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProfileEntity, { nullable: false })
  approver: ProfileEntity;

  @Column({
    type: 'enum',
    enum: ApprovalStatus,
    default: ApprovalStatus.PENDING,
  })
  status: ApprovalStatus;

  @ManyToMany(
    () => LeaveRequestEntity,
    (leaveRequest) => leaveRequest.approvals,
  )
  leaveRequests: LeaveRequestEntity[];
}
