import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';

import {
  MATCH_MODEL,
  MatchView,
} from '../../infrastructure/read-model/schema/match.schema';
import { GetMatchesByCompetitionIdQuery } from './get-matches-by-competition-id.query';

@QueryHandler(GetMatchesByCompetitionIdQuery)
export class GetMatchesByCompetitionIdHandler
  implements IQueryHandler<GetMatchesByCompetitionIdQuery> {
  constructor(@Inject(MATCH_MODEL) private matchModel: Model<MatchView>) {}

  async execute(
    query: GetMatchesByCompetitionIdQuery
  ): Promise<MatchView[] | null> {
    const matches = await this.matchModel
      .find({
        $and: [{ competitionId: query.competitionId }],
      })
      .sort({ index: 1 })
      .exec();
    return matches;
  }
}
