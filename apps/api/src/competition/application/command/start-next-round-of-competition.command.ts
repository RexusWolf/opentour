import { ICommand } from '@nestjs/cqrs';

export class StartNextRoundOfCompetitionCommand implements ICommand {
  constructor(readonly competitionId: string) {}
}
