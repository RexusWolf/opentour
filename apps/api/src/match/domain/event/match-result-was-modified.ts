import { StorableEvent } from 'event-sourcing-nestjs';

export class MatchResultWasModified extends StorableEvent {
  eventAggregate = 'match';
  eventVersion = 1;

  readonly id: string;
  readonly index: number;
  readonly competitionId: string;
  readonly localTeam: { id: string; score: number };
  readonly visitorTeam: { id: string; score: number };

  constructor(params: {
    id: string;
    index: number;
    competitionId: string;
    localTeam: { id: string; score: number };
    visitorTeam: { id: string; score: number };
  }) {
    super();
    this.id = params.id;
    this.index = params.index;
    this.competitionId = params.competitionId;
    this.localTeam = params.localTeam;
    this.visitorTeam = params.visitorTeam;
  }
}
