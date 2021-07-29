import { StorableEvent } from 'event-sourcing-nestjs';

export class CompetitionWasStarted extends StorableEvent {
  eventAggregate = 'competition';
  eventVersion = 1;

  constructor(readonly id: string, readonly currentJourney?: string) {
    super();
  }
}
