import { ProfileRepository } from './profile.repository';
import { LeaveCountRepository } from './leave-count.repository';
import { DocumentRepository } from './document.repository';

export const Persistence = [
  ProfileRepository,
  LeaveCountRepository,
  DocumentRepository,
];
