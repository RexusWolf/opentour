import { StorableEvent } from 'event-sourcing-nestjs';

export class VisitorTeamWasAddedToMatch extends StorableEvent {
  eventAggregate = 'match';
  eventVersion = 1;

  constructor(public readonly id: string, public readonly teamId: string) {
    super();
  }
}
