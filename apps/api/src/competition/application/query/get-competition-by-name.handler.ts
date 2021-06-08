import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';

import {
  COMPETITION_MODEL,
  CompetitionView,
} from '../../infrastructure/read-model/schema/competition.schema';
import { GetCompetitionByNameQuery } from './get-competition-by-name.query';

@QueryHandler(GetCompetitionByNameQuery)
export class GetCompetitionByNameHandler
  implements IQueryHandler<GetCompetitionByNameQuery> {
  constructor(
    @Inject(COMPETITION_MODEL) private competitionModel: Model<CompetitionView>
  ) {}

  async execute(
    query: GetCompetitionByNameQuery
  ): Promise<CompetitionView | null> {
    return this.competitionModel.findOne({
      name: query.name,
    });
  }
}
