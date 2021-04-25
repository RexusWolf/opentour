import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CompetitionId } from '../../../competition/domain/model';
import { MatchIdAlreadyTakenError } from '../../domain/exception/match-id-already-taken.error';
import { Match, MatchId, MatchIndex, MatchJourney } from '../../domain/model';
import { MATCHES, Matches } from '../../domain/repository';
import { MatchMapper } from '../../infrastructure/repository/match.mapper';
import { CreateMatchCommand } from './create-match.command';

@CommandHandler(CreateMatchCommand)
export class CreateMatchHandler implements ICommandHandler<CreateMatchCommand> {
  constructor(
    @Inject(MATCHES) private matches: Matches,
    private matchMapper: MatchMapper
  ) {}

  async execute(command: CreateMatchCommand) {
    const matchId = MatchId.fromString(command.matchId);
    const competitionId = CompetitionId.fromString(command.competitionId);
    const index = MatchIndex.fromNumber(command.index);
    const journey = MatchJourney.fromString(command.journey);

    if (await this.matches.find(matchId)) {
      throw MatchIdAlreadyTakenError.with(matchId);
    }

    const match = Match.add(matchId, competitionId, index, journey);

    this.matches.save(match);

    return this.matchMapper.aggregateToEntity(match);
  }
}
