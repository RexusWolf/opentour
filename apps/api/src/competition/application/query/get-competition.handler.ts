import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';

import {
  COMPETITION_MODEL,
  CompetitionView,
} from '../../infrastructure/read-model/schema/competition.schema';
import { GetCompetitionQuery } from './get-competition.query';

@QueryHandler(GetCompetitionQuery)
export class GetCompetitionHandler
  implements IQueryHandler<GetCompetitionQuery> {
  constructor(
    @Inject(COMPETITION_MODEL) private competitionModel: Model<CompetitionView>
  ) {}

  async execute(query: GetCompetitionQuery): Promise<CompetitionView | null> {
    return this.competitionModel.findOne({
      id: query.id,
    });
  }
}
