import { ICommand } from '@nestjs/cqrs';

export class CreateCompetitionCommand implements ICommand {
  constructor(
    public readonly competitionId: string,
    public readonly name: string,
    public readonly type: string,
    public readonly sportId: string,
    public readonly moderatorId: string
  ) {}
}
