import { StorableEvent } from 'event-sourcing-nestjs';

export class MatchWasRegistered extends StorableEvent {
  eventAggregate = 'match';
  eventVersion = 1;

  constructor(
    readonly id: string,
    readonly competitionId: string,
    readonly localTeam: { id: string; score: number },
    readonly visitorTeam: { id: string; score: number }
  ) {
    super();
  }
}
