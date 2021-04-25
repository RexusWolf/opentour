import { ICommand } from '@nestjs/cqrs';

export class DeleteTeamCommand implements ICommand {
  constructor(public readonly teamId: string) {}
}
