import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@babketickets/gittixcommon';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
