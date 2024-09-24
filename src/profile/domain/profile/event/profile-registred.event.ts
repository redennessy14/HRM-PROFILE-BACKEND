import { DomainEvent } from 'src/common/domain';
import { Email, Fullname } from '../value';

export class ProfileRegistered extends DomainEvent {
  constructor(
    readonly id: string,
    readonly email: Email,
    readonly fullName: Fullname,
  ) {
    super(ProfileRegistered.name);
  }
}
