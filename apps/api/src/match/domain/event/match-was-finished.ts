import { StorableEvent } from 'event-sourcing-nestjs';

export class MatchWasFinished extends StorableEvent {
  eventAggregate = 'match';
  eventVersion = 1;

  constructor(readonly id: string) {
    super();
  }
}
