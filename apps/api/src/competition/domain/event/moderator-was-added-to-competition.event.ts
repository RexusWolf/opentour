import { StorableEvent } from 'event-sourcing-nestjs';

export class ModeratorWasAddedToCompetition extends StorableEvent {
  eventAggregate = 'competition';
  eventVersion = 1;

  constructor(readonly id: string, readonly userId: string) {
    super();
  }
}
