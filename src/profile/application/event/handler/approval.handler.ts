import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ApprovalEvent } from 'src/leave-request/domain/event/approval.event';

@EventsHandler(ApprovalEvent)
export class ApprovalEventHandler implements IEventHandler<ApprovalEvent> {
  handle(event: ApprovalEvent) {
    console.log('You approver :', event.leaveRequestId);
  }
}
