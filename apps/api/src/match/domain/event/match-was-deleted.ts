import { StorableEvent } from 'event-sourcing-nestjs';

export class MatchWasDeleted extends StorableEvent {
  eventAggregate = 'match';
  eventVersion = 1;

  constructor(readonly id: string) {
    super();
  }
}
