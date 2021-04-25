import { StorableEvent } from 'event-sourcing-nestjs';

export class MatchScheduleWasModified extends StorableEvent {
  eventAggregate = 'match';
  eventVersion = 1;

  constructor(public readonly id: string, public readonly date: Date) {
    super();
  }
}
