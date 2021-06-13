import { ICommand } from '@nestjs/cqrs';

export class DeleteTeamCommand implements ICommand {
  constructor(readonly teamId: string) {}
}
