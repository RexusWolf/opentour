import { StorableEvent } from 'event-sourcing-nestjs';

export class MemberWasAddedToTeam extends StorableEvent {
  eventAggregate = 'team';
  eventVersion = 1;

  constructor(public readonly id: string, public readonly userId: string) {
    super();
  }
}
