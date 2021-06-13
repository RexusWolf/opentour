import { StorableEvent } from 'event-sourcing-nestjs';

export class UserWasCreated extends StorableEvent {
  eventAggregate = 'user';
  eventVersion = 1;

  constructor(
    readonly id: string,
    readonly username: string,
    readonly password: string
  ) {
    super();
  }
}
