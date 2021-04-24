import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CompetitionDTO } from '@opentour/contracts';

import { COMPETITIONS, Competitions } from '../../domain/repository';
import { CompetitionMapper } from '../../infrastructure/repository/competition.mapper';
import { GetCompetitionsQuery } from './get-competitions.query';

@QueryHandler(GetCompetitionsQuery)
export class GetUsersHandler implements IQueryHandler<GetCompetitionsQuery> {
  constructor(
    @Inject(COMPETITIONS) private competitions: Competitions,
    private competitionMapper: CompetitionMapper
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetCompetitionsQuery): Promise<CompetitionDTO[] | null> {
    const competitions = await this.competitions.findAll();

    return competitions.map(this.competitionMapper.aggregateToEntity);
  }
}
