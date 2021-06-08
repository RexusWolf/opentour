import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';

import {
  MATCH_MODEL,
  MatchView,
} from '../../infrastructure/read-model/schema/match.schema';
import { GetMatchesQuery } from './get-matches.query';

@QueryHandler(GetMatchesQuery)
export class GetMatchesHandler implements IQueryHandler<GetMatchesQuery> {
  constructor(@Inject(MATCH_MODEL) private matchModel: Model<MatchView>) {}

  async execute(query: GetMatchesQuery): Promise<MatchView[] | null> {
    return await this.matchModel.find().exec();
  }
}
