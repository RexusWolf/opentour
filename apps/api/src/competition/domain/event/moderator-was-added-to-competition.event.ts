import { StorableEvent } from 'event-sourcing-nestjs';

export class ModeratorWasAddedToCompetition extends StorableEvent {
  eventAggregate = 'competition';
  eventVersion = 1;

  constructor(public readonly id: string, public readonly userId: string) {
    super();
  }
}
