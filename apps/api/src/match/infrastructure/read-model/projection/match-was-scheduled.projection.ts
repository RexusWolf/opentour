import { Inject } from '@nestjs/common';
import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { MatchWasScheduled } from '../../../domain/event/match-was-scheduled';
import { MatchView } from '../schema/match.schema';

@ViewUpdaterHandler(MatchWasScheduled)
export class MatchWasScheduledProjection
  implements IViewUpdater<MatchWasScheduled> {
  constructor(
    @Inject('MATCH_MODEL')
    private readonly matchModel: Model<MatchView>
  ) {}

  async handle(event: MatchWasScheduled) {
    await this.matchModel
      .updateOne({ _id: event.id }, { $set: { date: event.date } })
      .exec();
  }
}
