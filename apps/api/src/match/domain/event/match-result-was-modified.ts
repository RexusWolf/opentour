import { StorableEvent } from 'event-sourcing-nestjs';

export class MatchResultWasModified extends StorableEvent {
  eventAggregate = 'match';
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly result: { localTeamScore: number; visitorTeamScore: number }
  ) {
    super();
  }
}
