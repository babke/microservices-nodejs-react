import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@babketickets/gittixcommon';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
