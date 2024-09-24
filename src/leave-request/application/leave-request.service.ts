import { Injectable } from '@nestjs/common';
import { CreateLeaveRequestDto } from '../port/resource/dto';
import { ProfileRepository } from 'src/profile/port/persistence/profile.repository';
import { LeaveRequestRepository } from '../port/persistence/leave-request.repository';
import { Period } from '../domain/value';
import { Approval, Employee, LeaveRequest } from '../domain';
import { ApprovalsRepository } from '../port/persistence/approvals.repository';
import { parseDate } from 'src/common/utils';
import { MediaService } from 'src/profile/port/adapter/media.service';

@Injectable()
export class LeaveRequestService {
  constructor(
    private readonly leaveRequestRepo: LeaveRequestRepository,
    private readonly profileRepo: ProfileRepository,
    private readonly approvalsRepo: ApprovalsRepository,
    private readonly media: MediaService,
  ) {}

  async getAllLeaveRequest() {
    return this.leaveRequestRepo.findAll();
  }
  async getUpcomingAbsences() {
    const absences = await this.leaveRequestRepo.findUpcomingAbsences();
    const absencesWithAvatars = await Promise.all(
      absences.map(async (absence) => {
        const employeeAvatarUrl = absence.employee.avatar
          ? await this.media.getFileUrl(absence.employee.avatar)
          : null;

        return {
          ...absence,
          employee: {
            ...absence.employee,
            avatarUrl: employeeAvatarUrl,
          },
        };
      }),
    );
    return absencesWithAvatars;
  }

  async getLeaveRequest(id: string) {
    const requests = await this.leaveRequestRepo.findByEmployeeId(id);

    const requestsWithAvatarUrls = await Promise.all(
      requests.map(async (request) => {
        const employeeAvatarUrl = request.employee.avatar
          ? await this.media.getFileUrl(request.employee.avatar)
          : null;
        const approvalWithAvatars = await Promise.all(
          request.approvals.map(async (approval) => {
            const approverAvatarUrl = approval.approver.avatar
              ? await this.media.getFileUrl(approval.approver.avatar)
              : null;
            return {
              ...approval,
              approver: {
                ...approval.approver,
                avatarUrl: approverAvatarUrl,
              },
            };
          }),
        );
        return {
          ...request,
          employee: {
            ...request.employee,
            avatarUrl: employeeAvatarUrl,
          },
          approvals: approvalWithAvatars,
        };
      }),
    );

    return requestsWithAvatarUrls;
  }

  async getLeaveByApprover(approverId: string) {
    const requests =
      await this.leaveRequestRepo.findLeaveByApprover(approverId);
    const requestsWithAvatarUrls = await Promise.all(
      requests.map(async (request) => {
        const employeeAvatarUrl = request.employee.avatar
          ? await this.media.getFileUrl(request.employee.avatar)
          : null;
        const approvalWithAvatars = await Promise.all(
          request.approvals.map(async (approval) => {
            const approverAvatarUrl = approval.approver.avatar
              ? await this.media.getFileUrl(approval.approver.avatar)
              : null;
            return {
              ...approval,
              approver: {
                ...approval.approver,
                avatarUrl: approverAvatarUrl,
              },
            };
          }),
        );
        return {
          ...request,
          employee: {
            ...request.employee,
            avatarUrl: employeeAvatarUrl,
          },
          approvals: approvalWithAvatars,
        };
      }),
    );

    return requestsWithAvatarUrls;
  }

  async createLeaveRequest(createLeaveRequestDto: CreateLeaveRequestDto) {
    const { employeeId, type, startDate, endDate, approvals } =
      createLeaveRequestDto;
    const employee = await this.profileRepo.findById(employeeId);

    const parsedStartDate = parseDate(startDate);
    const parsedEndDate = parseDate(endDate);

    const requests = await this.leaveRequestRepo.findByEmployeeId(employeeId);

    const period = new Period(parsedStartDate, parsedEndDate);
    LeaveRequest.checkLeaveRequest(requests);
    LeaveRequest.validateLeaveRequest(parsedStartDate, type, employee.hiredAt);
    LeaveRequest.checkEmployeeLeaveCount(employee, type, period.daysCount);

    const approval = await Promise.all(
      approvals.map(async (approverId) => {
        return Approval.New(Employee.New(approverId));
      }),
    );

    const approvalEntities = await Promise.all(
      approvals.map(async (approverId) => {
        const approver = await this.profileRepo.findById(approverId);
        const approval = Approval.New(Employee.New(approverId));
        return await this.approvalsRepo.save(approval, approver);
      }),
    );

    const leaveRequest = LeaveRequest.New(
      Employee.New(employeeId),
      period,
      type,
      approval,
    );

    return await this.leaveRequestRepo.save(
      leaveRequest,
      employee,
      approvalEntities,
    );
  }
}
