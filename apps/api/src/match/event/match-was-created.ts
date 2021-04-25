import { StorableEvent } from 'event-sourcing-nestjs';

export class MatchWasCreated extends StorableEvent {
  eventAggregate = 'match';
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly competitionId: string,
    public readonly index: number,
    public readonly journey: string
  ) {
    super();
  }
}
