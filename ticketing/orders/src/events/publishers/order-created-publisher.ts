import {
  Publisher,
  Subjects,
  OrderCreatedEvent,
} from '@babketickets/gittixcommon';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
