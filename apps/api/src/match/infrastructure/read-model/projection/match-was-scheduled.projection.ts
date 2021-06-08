import { Inject } from '@nestjs/common';
import { IViewUpdater } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { MatchWasScheduled } from '../../../domain/event/match-was-scheduled';
import { MatchView } from '../schema/match.schema';

export class MatchWasScheduledProjection
  implements IViewUpdater<MatchWasScheduled> {
  constructor(
    @Inject('MATCH_MODEL')
    private readonly matchModel: Model<MatchView>
  ) {}

  async handle(event: MatchWasScheduled) {
    const matchView = new this.matchModel({
      _id: event.id,
      date: event.date,
    });

    await matchView.save();
  }
}
