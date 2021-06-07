import { ICommand } from '@nestjs/cqrs';

export class UpdateCompetitionCommand implements ICommand {
  readonly competitionId: string;
  readonly name: string;
  readonly moderatorIds: string[];

  constructor(params: { id: string; name: string; moderatorIds: string[] }) {
    this.competitionId = params.id;
    this.name = params.name;
    this.moderatorIds = params.moderatorIds;
  }
}
