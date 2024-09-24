import { IEvent } from '@nestjs/cqrs';

export class ApprovalEvent implements IEvent {
  constructor(public readonly leaveRequestId: string) {}
}
