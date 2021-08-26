import { ICommand } from '@nestjs/cqrs';
import { CreateCompetitionDTO } from '@opentour/contracts';

export class CreateCompetitionCommand implements ICommand {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly sportName: string;
  readonly moderatorId: string;
  readonly scoreSystem: {
    victory: number;
    tie: number;
    defeat: number;
  };

  constructor(createCompetitionDTO: CreateCompetitionDTO, moderatorId: string) {
    this.id = createCompetitionDTO.id;
    this.name = createCompetitionDTO.name;
    this.type = createCompetitionDTO.type;
    this.sportName = createCompetitionDTO.sportName;
    this.scoreSystem = createCompetitionDTO.scoreSystem;
    this.moderatorId = moderatorId;
  }
}
