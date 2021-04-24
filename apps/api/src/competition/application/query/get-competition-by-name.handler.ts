import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CompetitionDTO } from '@opentour/contracts';

import { CompetitionName } from '../../domain/model';
import { COMPETITIONS, Competitions } from '../../domain/repository';
import { CompetitionMapper } from '../../infrastructure/repository/competition.mapper';
import { GetCompetitionByNameQuery } from './get-competition-by-name.query';

@QueryHandler(GetCompetitionByNameQuery)
export class GetCompetitionByNameHandler
  implements IQueryHandler<GetCompetitionByNameQuery> {
  constructor(
    @Inject(COMPETITIONS) private competitions: Competitions,
    private competitionMapper: CompetitionMapper
  ) {}

  async execute(
    query: GetCompetitionByNameQuery
  ): Promise<CompetitionDTO | null> {
    const competition = await this.competitions.findOneByName(
      CompetitionName.fromString(query.name)
    );

    if (!competition) {
      return null;
    }

    return this.competitionMapper.aggregateToEntity(competition);
  }
}
