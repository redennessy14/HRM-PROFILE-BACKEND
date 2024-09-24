import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { LeaveCountService } from '../../leave-count.service';
import { ProfileRegistered } from 'src/profile/domain/profile/event';
import { ProfileService } from '../../profile.service';

@EventsHandler(ProfileRegistered)
export class ProfileRegisteredHandler
  implements IEventHandler<ProfileRegistered>
{
  constructor(
    private readonly leaveCountService: LeaveCountService,
    private readonly profileService: ProfileService,
  ) {}

  async handle(event: ProfileRegistered) {
    await this.leaveCountService.createLeaveCounts(event.id);
    await this.profileService.sendConfirmationLink(event.id);
  }
}
