import { StorableEvent } from 'event-sourcing-nestjs';

export class MatchTeamsWereModified extends StorableEvent {
  eventAggregate = 'match';
  eventVersion = 1;

  readonly id: string;
  readonly localTeamId?: string;
  readonly visitorTeamId?: string;

  constructor(params: {
    id: string;
    localTeamId?: string;
    visitorTeamId?: string;
  }) {
    super();
    this.id = params.id;
    this.localTeamId = params.localTeamId;
    this.visitorTeamId = params.visitorTeamId;
  }
}
