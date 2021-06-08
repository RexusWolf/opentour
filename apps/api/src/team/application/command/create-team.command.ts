import { ICommand } from '@nestjs/cqrs';

export class CreateTeamCommand implements ICommand {
  readonly id: string;
  readonly competitionId: string;
  readonly name: string;
  readonly captainId: string;

  constructor(params: {
    id: string;
    competitionId: string;
    name: string;
    captainId: string;
  }) {
    this.id = params.id;
    this.competitionId = params.competitionId;
    this.name = params.name;
    this.captainId = params.captainId;
  }
}
