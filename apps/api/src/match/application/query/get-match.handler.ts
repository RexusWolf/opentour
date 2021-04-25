import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MatchDTO } from '@opentour/contracts';

import { MatchId } from '../../domain/model';
import { MATCHES } from '../../domain/repository';
import { Matches } from '../../domain/repository/matches';
import { MatchMapper } from '../../infrastructure/repository/match.mapper';
import { GetMatchQuery } from './get-match.query';

@QueryHandler(GetMatchQuery)
export class GetMatchHandler implements IQueryHandler<GetMatchQuery> {
  constructor(
    @Inject(MATCHES) private matches: Matches,
    private matchMapper: MatchMapper
  ) {}

  async execute(query: GetMatchQuery): Promise<MatchDTO | null> {
    const match = await this.matches.find(MatchId.fromString(query.id));

    if (!match) {
      return null;
    }

    return this.matchMapper.aggregateToEntity(match);
  }
}
