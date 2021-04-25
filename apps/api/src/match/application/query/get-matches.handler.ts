import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MatchDTO } from '@opentour/contracts';

import { MATCHES, Matches } from '../../domain/repository';
import { MatchMapper } from '../../infrastructure/repository/match.mapper';
import { GetMatchesQuery } from './get-matches.query';

@QueryHandler(GetMatchesQuery)
export class GetMatchesHandler implements IQueryHandler<GetMatchesQuery> {
  constructor(
    @Inject(MATCHES) private matches: Matches,
    private matchMapper: MatchMapper
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetMatchesQuery): Promise<MatchDTO[] | null> {
    const matches = await this.matches.findAll();

    return matches.map(this.matchMapper.aggregateToEntity);
  }
}
