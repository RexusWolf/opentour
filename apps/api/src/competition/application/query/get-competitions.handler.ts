import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';

import {
  COMPETITION_MODEL,
  CompetitionView,
} from '../../infrastructure/read-model/schema/competition.schema';
import { GetCompetitionsQuery } from './get-competitions.query';

@QueryHandler(GetCompetitionsQuery)
export class GetCompetitionsHandler
  implements IQueryHandler<GetCompetitionsQuery>
{
  constructor(
    @Inject(COMPETITION_MODEL) private competitionModel: Model<CompetitionView>
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetCompetitionsQuery): Promise<CompetitionView[]> {
    return await this.competitionModel.find({ deleted: null }).exec();
  }
}
