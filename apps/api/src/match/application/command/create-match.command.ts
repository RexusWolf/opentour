import { ICommand } from '@nestjs/cqrs';

export class CreateMatchCommand implements ICommand {
  constructor(
    public readonly matchId: string,
    public readonly competitionId: string,
    public readonly index: number,
    public readonly journey: string
  ) {}
}
