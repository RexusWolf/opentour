import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';

import {
  RANKING_MODEL,
  RankingView,
} from '../../infrastructure/read-model/schema/ranking.schema';
import { GetCompetitionRankingQuery } from './get-competition-ranking.query';

@QueryHandler(GetCompetitionRankingQuery)
export class GetCompetitionRankingHandler
  implements IQueryHandler<GetCompetitionRankingQuery> {
  constructor(
    @Inject(RANKING_MODEL) private rankingModel: Model<RankingView>
  ) {}

  async execute(
    query: GetCompetitionRankingQuery
  ): Promise<RankingView | null> {
    const ranking = await this.rankingModel
      .findOne({ competitionId: query.id })
      .exec();
    return ranking;
  }
}
