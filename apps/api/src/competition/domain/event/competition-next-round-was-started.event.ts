import { StorableEvent } from 'event-sourcing-nestjs';

export class CompetitionNextRoundWasStarted extends StorableEvent {
  eventAggregate = 'competition';
  eventVersion = 1;

  constructor(readonly id: string, readonly nextJourney: string) {
    super();
  }
}
