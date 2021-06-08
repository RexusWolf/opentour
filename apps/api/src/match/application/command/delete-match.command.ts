import { ICommand } from '@nestjs/cqrs';

export class DeleteMatchCommand implements ICommand {
  readonly matchId: string;

  constructor(matchId: string) {
    this.matchId = matchId;
  }
}
