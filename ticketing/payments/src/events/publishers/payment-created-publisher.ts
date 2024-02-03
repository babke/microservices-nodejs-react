import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from '@babketickets/gittixcommon';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
