import { ICommand } from '@nestjs/cqrs';

export class DeleteCompetitionCommand implements ICommand {
  constructor(public readonly competitionId: string) {}
}
