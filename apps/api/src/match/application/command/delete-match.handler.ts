import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { MatchIdNotFoundError } from '../../domain/exception/match-id-not-found.error';
import { MatchId } from '../../domain/model';
import { MATCHES, Matches } from '../../domain/repository';
import { MatchMapper } from '../../infrastructure/repository/match.mapper';
import { DeleteMatchCommand } from './delete-match.command';

@CommandHandler(DeleteMatchCommand)
export class DeleteMatchHandler implements ICommandHandler<DeleteMatchCommand> {
  constructor(
    @Inject(MATCHES) private matches: Matches,
    private matchMapper: MatchMapper
  ) {}

  async execute(command: DeleteMatchCommand) {
    const matchId = MatchId.fromString(command.matchId);

    const match = await this.matches.find(matchId);
    if (!match) {
      throw MatchIdNotFoundError.with(matchId);
    }

    match.delete();

    this.matches.save(match);

    return this.matchMapper.aggregateToEntity(match);
  }
}
