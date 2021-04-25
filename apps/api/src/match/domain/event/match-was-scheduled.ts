import { StorableEvent } from 'event-sourcing-nestjs';

export class MatchWasScheduled extends StorableEvent {
  eventAggregate = 'match';
  eventVersion = 1;

  constructor(public readonly id: string, public readonly date: Date) {
    super();
  }
}
