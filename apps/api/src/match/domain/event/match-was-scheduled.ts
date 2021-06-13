import { StorableEvent } from 'event-sourcing-nestjs';

export class MatchWasScheduled extends StorableEvent {
  eventAggregate = 'match';
  eventVersion = 1;

  constructor(readonly id: string, readonly date: Date) {
    super();
  }
}
