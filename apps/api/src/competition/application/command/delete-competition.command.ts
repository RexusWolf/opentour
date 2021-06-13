import { ICommand } from '@nestjs/cqrs';

export class DeleteCompetitionCommand implements ICommand {
  constructor(readonly competitionId: string) {}
}
