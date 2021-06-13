import { StorableEvent } from 'event-sourcing-nestjs';

export class UserRoleWasRemoved extends StorableEvent {
  eventAggregate = 'user';
  eventVersion = 1;

  constructor(readonly id: string, readonly role: string) {
    super();
  }
}
