import { ICommand } from '@nestjs/cqrs';

export class StartCompetitionCommand implements ICommand {
  constructor(readonly competitionId: string) {}
}
