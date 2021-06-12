import { StorableEvent } from 'event-sourcing-nestjs';

export class MatchWasCreated extends StorableEvent {
  eventAggregate = 'match';
  eventVersion = 1;

  readonly id: string;
  readonly competitionId: string;
  readonly index: number;
  readonly journey: string;
  readonly localTeamId: string;
  readonly visitorTeamId: string;

  constructor(params: {
    id: string;
    competitionId: string;
    index: number;
    journey: string;
    localTeamId: string;
    visitorTeamId: string;
  }) {
    super();
    this.id = params.id;
    this.competitionId = params.competitionId;
    this.index = params.index;
    this.journey = params.journey;
    this.localTeamId = params.localTeamId;
    this.visitorTeamId = params.visitorTeamId;
  }
}
