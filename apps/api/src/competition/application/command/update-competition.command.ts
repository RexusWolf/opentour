import { ICommand } from '@nestjs/cqrs';
import { EditCompetitionDTO } from '@opentour/contracts';

export class UpdateCompetitionCommand implements ICommand {
  readonly competitionId: string;
  readonly name: string;
  readonly moderatorIds: string[];

  constructor(id: string, editCompetitionDTO: EditCompetitionDTO) {
    this.competitionId = id;
    this.name = editCompetitionDTO.name;
    this.moderatorIds = editCompetitionDTO.moderatorIds;
  }
}
