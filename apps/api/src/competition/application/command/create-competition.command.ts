import { ICommand } from '@nestjs/cqrs';

export class CreateCompetitionCommand implements ICommand {
  readonly competitionId: string;
  readonly name: string;
  readonly type: string;
  readonly sportId: string;
  readonly moderatorId: string;

  constructor(params: {
    competitionId: string;
    name: string;
    type: string;
    sportId: string;
    moderatorId: string;
  }) {
    this.competitionId = params.competitionId;
    this.name = params.name;
    this.type = params.type;
    this.sportId = params.sportId;
    this.moderatorId = params.moderatorId;
  }
}
