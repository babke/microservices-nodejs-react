import {
  Publisher,
  Subjects,
  OrderCancelledEvent,
} from '@babketickets/gittixcommon';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
