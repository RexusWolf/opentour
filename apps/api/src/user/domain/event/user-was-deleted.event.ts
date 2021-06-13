import { StorableEvent } from 'event-sourcing-nestjs';

export class UserWasDeleted extends StorableEvent {
  eventAggregate = 'user';
  eventVersion = 1;
  readonly createdOn = new Date();

  constructor(readonly id: string) {
    super();
  }
}
