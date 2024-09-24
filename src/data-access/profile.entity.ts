import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LeaveRequestEntity } from './leave-request.entity';
import { Exclude } from 'class-transformer';
import { LeaveCountEntity } from './leave-count.entity';

@Entity({
  name: 'employee',
})
export class ProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true, name: 'about_me' })
  aboutMe: string;

  @Column({ nullable: true })
  role: string;

  @Column({ nullable: true })
  birthday: string;

  @Column({ nullable: true, name: 'hired_at' })
  hiredAt: string;

  @Column({ nullable: true })
  phone: string;

  @OneToOne(() => LeaveCountEntity, (dayOffCounts) => dayOffCounts.employee, {
    cascade: true,
  })
  leaveCounts: LeaveCountEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @OneToMany(() => LeaveRequestEntity, (leaveRequest) => leaveRequest.employee)
  leaveRequests: LeaveRequestEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
