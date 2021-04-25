import { StorableEvent } from 'event-sourcing-nestjs';

import { MatchResult } from '../model/match-result';

export class MatchResultWasModified extends StorableEvent {
  eventAggregate = 'match';
  eventVersion = 1;

  constructor(public readonly id: string, public readonly result: MatchResult) {
    super();
  }
}
