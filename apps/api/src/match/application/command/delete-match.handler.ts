import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { MATCHES, Matches, MatchId , MatchIdNotFoundError } from '../../domain';
import { DeleteMatchCommand } from './delete-match.command';

@CommandHandler(DeleteMatchCommand)
export class DeleteMatchHandler implements ICommandHandler<DeleteMatchCommand> {
  constructor(@Inject(MATCHES) private matches: Matches) {}

  async execute(command: DeleteMatchCommand) {
    const matchId = MatchId.fromString(command.matchId);

    const match = await this.matches.find(matchId);
    if (!match) {
      throw MatchIdNotFoundError.with(matchId);
    }

    match.delete();

    this.matches.save(match);
  }
}
