import { Inject } from '@nestjs/common';
import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { MatchWasDeleted } from '../../../domain';
import { MatchView } from '../schema/match.schema';

@ViewUpdaterHandler(MatchWasDeleted)
export class MatchWasDeletedProjection
  implements IViewUpdater<MatchWasDeleted> {
  constructor(
    @Inject('MATCH_MODEL')
    private readonly matchModel: Model<MatchView>
  ) {}

  async handle(event: MatchWasDeleted) {
    await this.matchModel
      .updateOne({ _id: event.id }, { $set: { deleted: new Date() } })
      .exec();
  }
}
