import { ProfileService } from './profile.service';
import { LeaveCountService } from './leave-count.service';
import { DocumentService } from './document.service';

export const Application = [DocumentService, LeaveCountService, ProfileService];

export { LeaveCountService, ProfileService, DocumentService };
