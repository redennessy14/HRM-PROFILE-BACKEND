import { Body, Param } from '@nestjs/common';
import { CreateLeaveRequestDto } from './dto';
import { LeaveRequestService } from 'src/leave-request/application';
import { CurrentUser } from 'src/common/decorator';
import { UniqueApproverPipe } from '../../../common/pipe';
import {
  CreateLeaveRequestDecorator,
  GetLeaveByApprover,
  GetLeaveById,
  GetAllLeave,
  LeaveRequests,
  GetUpcomingAbsences,
} from './decorator';

@LeaveRequests()
export class LeaveRequestResourse {
  constructor(private leaveRequestService: LeaveRequestService) {}

  @GetUpcomingAbsences()
  async getUpcomingAbsences() {
    return await this.leaveRequestService.getUpcomingAbsences();
  }

  @GetAllLeave()
  async getAllLeaveRequest(@CurrentUser('id') id: string) {
    return this.leaveRequestService.getAllLeaveRequest();
  }

  @GetLeaveById()
  async getLeaveRequest(@Param('id') id: string) {
    return this.leaveRequestService.getLeaveRequest(id);
  }

  @GetLeaveByApprover()
  async getLeaveById(@Param('id') id: string) {
    return await this.leaveRequestService.getLeaveByApprover(id);
  }

  @CreateLeaveRequestDecorator()
  async createLeaveRequest(
    @CurrentUser('id') employee: string,
    @Body() createLeaveRequestDto: CreateLeaveRequestDto,
  ) {
    createLeaveRequestDto.employeeId = employee;
    new UniqueApproverPipe().transform(createLeaveRequestDto);
    return this.leaveRequestService.createLeaveRequest(createLeaveRequestDto);
  }
}
