import { ICommand } from '@nestjs/cqrs';
import { CreateCompetitionDTO } from '@opentour/contracts';

export class CreateCompetitionCommand implements ICommand {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly sportName: string;
  readonly moderatorId: string;

  constructor(competition: CreateCompetitionDTO) {
    this.id = competition.id;
    this.name = competition.name;
    this.type = competition.type;
    this.sportName = competition.sportName;
    this.moderatorId = competition.moderatorId;
  }
}
