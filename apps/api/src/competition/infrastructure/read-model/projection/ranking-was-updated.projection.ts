import { Inject } from '@nestjs/common';
import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { MatchResultWasModified } from '../../../../match/domain';
import { MatchView } from '../../../../match/infrastructure/read-model/schema/match.schema';
import { RankingView } from '../schema/ranking.schema';

@ViewUpdaterHandler(MatchResultWasModified)
export class RankingWasUpdatedProjection
  implements IViewUpdater<MatchResultWasModified> {
  constructor(
    @Inject('MATCH_MODEL')
    private readonly matchModel: Model<MatchView>,
    @Inject('RANKING_MODEL')
    private readonly rankingModel: Model<RankingView>
  ) {}

  async handle(event: MatchResultWasModified) {
    await this.matchModel
      .updateOne({ _id: event.id }, { $set: { deleted: new Date() } })
      .exec();
  }
}
