import { ICommand } from '@nestjs/cqrs';

export class UpdateCompetitionCommand implements ICommand {
  constructor(
    public readonly competitionId: string,
    public readonly name: string,
    public readonly moderatorIds: string[]
  ) {}
}
