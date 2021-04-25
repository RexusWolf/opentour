import { ICommand } from '@nestjs/cqrs';

export class DeleteMatchCommand implements ICommand {
  constructor(public readonly matchId: string) {}
}
