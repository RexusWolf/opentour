import { StorableEvent } from 'event-sourcing-nestjs';

export class MatchWasDeleted extends StorableEvent {
  eventAggregate = 'match';
  eventVersion = 1;

  constructor(public readonly id: string) {
    super();
  }
}
