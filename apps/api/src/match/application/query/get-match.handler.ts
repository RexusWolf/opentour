import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';

import {
  MATCH_MODEL,
  MatchView,
} from '../../infrastructure/read-model/schema/match.schema';
import { GetMatchQuery } from './get-match.query';

@QueryHandler(GetMatchQuery)
export class GetMatchHandler implements IQueryHandler<GetMatchQuery> {
  constructor(@Inject(MATCH_MODEL) private matchModel: Model<MatchView>) {}

  async execute(query: GetMatchQuery): Promise<MatchView | null> {
    return await this.matchModel.findById(query.id).exec();
  }
}
