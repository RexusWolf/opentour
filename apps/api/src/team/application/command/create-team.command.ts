import { ICommand } from '@nestjs/cqrs';
import { CreateTeamDTO } from '@opentour/contracts';

export class CreateTeamCommand implements ICommand {
  readonly id: string;
  readonly competitionId: string;
  readonly name: string;
  readonly captainId: string;
  readonly logo: string;

  constructor(createTeamDTO: CreateTeamDTO) {
    this.id = createTeamDTO.id;
    this.competitionId = createTeamDTO.competitionId;
    this.name = createTeamDTO.name;
    this.captainId = createTeamDTO.captainId;
    this.logo = createTeamDTO.logo;
  }
}
