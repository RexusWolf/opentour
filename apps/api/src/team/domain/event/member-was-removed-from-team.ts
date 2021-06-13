import { StorableEvent } from 'event-sourcing-nestjs';

export class MemberWasRemovedFromTeam extends StorableEvent {
  eventAggregate = 'team';
  eventVersion = 1;

  constructor(readonly id: string, readonly userId: string) {
    super();
  }
}
