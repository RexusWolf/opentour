import { ICommand } from '@nestjs/cqrs';

export class StartCompetitionCommand implements ICommand {
  readonly competitionId: string;

  constructor(id: string) {
    this.competitionId = id;
  }
}
