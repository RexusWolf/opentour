import { StorableEvent } from 'event-sourcing-nestjs';

export class CompetitionWasStarted extends StorableEvent {
  eventAggregate = 'competition';
  eventVersion = 1;

  constructor(public readonly id: string) {
    super();
  }
}
