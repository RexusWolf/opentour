import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CompetitionDTO } from '@opentour/contracts';

import { CompetitionId } from '../../domain/model';
import { COMPETITIONS } from '../../domain/repository';
import { Competitions } from '../../domain/repository/competitions';
import { CompetitionMapper } from '../../infrastructure/repository/competition.mapper';
import { GetCompetitionQuery } from './get-competition.query';

@QueryHandler(GetCompetitionQuery)
export class GetCompetitionHandler
  implements IQueryHandler<GetCompetitionQuery> {
  constructor(
    @Inject(COMPETITIONS) private competitions: Competitions,
    private competitionMapper: CompetitionMapper
  ) {}

  async execute(query: GetCompetitionQuery): Promise<CompetitionDTO | null> {
    const competition = await this.competitions.find(
      CompetitionId.fromString(query.id)
    );

    if (!competition) {
      return null;
    }

    return this.competitionMapper.aggregateToEntity(competition);
  }
}
