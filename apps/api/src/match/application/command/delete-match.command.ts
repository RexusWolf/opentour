import { ICommand } from '@nestjs/cqrs';

export class DeleteMatchCommand implements ICommand {
  constructor(readonly matchId: string) {}
}
