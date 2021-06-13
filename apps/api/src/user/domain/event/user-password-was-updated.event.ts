import { StorableEvent } from 'event-sourcing-nestjs';

export class UserPasswordWasUpdated extends StorableEvent {
  eventAggregate = 'user';
  eventVersion = 1;

  constructor(readonly id: string, readonly password: string) {
    super();
  }
}
