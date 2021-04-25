import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MatchDTO } from '@opentour/contracts';

import { CompetitionId } from '../../../competition/domain/model';
import { MATCHES, Matches } from '../../domain/repository';
import { MatchMapper } from '../../infrastructure/repository/match.mapper';
import { GetMatchesByCompetitionIdQuery } from './get-matches-by-competition-id.query';

@QueryHandler(GetMatchesByCompetitionIdQuery)
export class GetMatchesByCompetitionIdHandler
  implements IQueryHandler<GetMatchesByCompetitionIdQuery> {
  constructor(
    @Inject(MATCHES) private matches: Matches,
    private matchMapper: MatchMapper
  ) {}

  async execute(
    query: GetMatchesByCompetitionIdQuery
  ): Promise<MatchDTO[] | null> {
    const matches = await this.matches.findAllByCompetition(
      CompetitionId.fromString(query.competitionId)
    );

    if (!matches) {
      return null;
    }

    return matches.map((match) => this.matchMapper.aggregateToEntity(match));
  }
}
