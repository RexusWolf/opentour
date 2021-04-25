import { ICommand } from '@nestjs/cqrs';

export class CreateTeamCommand implements ICommand {
  constructor(
    public readonly teamId: string,
    public readonly competitionId: string,
    public readonly name: string,
    public readonly captainId: string
  ) {}
}
