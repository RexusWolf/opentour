import { ICommand } from '@nestjs/cqrs';

export class UpdateTeamCommand implements ICommand {
  constructor(
    public readonly teamId: string,
    public readonly name: string,
    public readonly membersIds: string[]
  ) {}
}
