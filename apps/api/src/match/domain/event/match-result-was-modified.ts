import { StorableEvent } from 'event-sourcing-nestjs';

export class MatchResultWasModified extends StorableEvent {
  eventAggregate = 'match';
  eventVersion = 1;

  constructor(
    readonly id: string,
    readonly result: { localTeamScore: number; visitorTeamScore: number }
  ) {
    super();
  }
}
