import { LeaveRequestService } from './leave-request.service';
import { ApprovalsService } from './approvals.service';

export const Application = [LeaveRequestService, ApprovalsService];

export { LeaveRequestService, ApprovalsService };
