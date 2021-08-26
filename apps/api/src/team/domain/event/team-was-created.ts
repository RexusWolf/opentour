import { StorableEvent } from 'event-sourcing-nestjs';

export class TeamWasCreated extends StorableEvent {
  eventAggregate = 'team';
  eventVersion = 1;

  readonly id: string;
  readonly competitionId: string;
  readonly name: string;
  readonly captainId: string;
  readonly logo: string;

  constructor(params: {
    id: string;
    competitionId: string;
    name: string;
    captainId: string;
    logo: string;
  }) {
    super();
    this.id = params.id;
    this.competitionId = params.competitionId;
    this.name = params.name;
    this.captainId = params.captainId;
    this.logo = params.logo;
  }
}
