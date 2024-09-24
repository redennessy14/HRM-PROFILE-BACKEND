import { ApprovalsRepository } from './approvals.repository';
import { LeaveRequestRepository } from './leave-request.repository';

export const Persistence = [LeaveRequestRepository, ApprovalsRepository];
