import { StorableEvent } from 'event-sourcing-nestjs';

export class UserRoleWasAdded extends StorableEvent {
  eventAggregate = 'user';
  eventVersion = 1;

  constructor(readonly id: string, readonly role: string) {
    super();
  }
}
