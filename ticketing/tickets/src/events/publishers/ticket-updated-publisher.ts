import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@babketickets/gittixcommon';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
