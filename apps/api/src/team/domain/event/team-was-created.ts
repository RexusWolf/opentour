import { CreateTeamDTO } from '@opentour/contracts';
import { StorableEvent } from 'event-sourcing-nestjs';

export class TeamWasCreated extends StorableEvent {
  eventAggregate = 'team';
  eventVersion = 1;

  readonly id: string;
  readonly competitionId: string;
  readonly name: string;
  readonly captainId: string;
  readonly logo: string;

  constructor(createTeamDTO: CreateTeamDTO) {
    super();
    this.id = createTeamDTO.id;
    this.competitionId = createTeamDTO.competitionId;
    this.name = createTeamDTO.name;
    this.captainId = createTeamDTO.captainId;
    this.logo = createTeamDTO.logo;
  }
}
