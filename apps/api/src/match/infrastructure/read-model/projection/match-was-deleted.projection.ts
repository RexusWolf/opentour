import { Inject } from '@nestjs/common';
import { IViewUpdater } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { MatchWasDeleted } from '../../../domain/event';
import { MatchView } from '../schema/match.schema';

export class MatchWasDeletedProjection
  implements IViewUpdater<MatchWasDeleted> {
  constructor(
    @Inject('MATCH_MODEL')
    private readonly matchModel: Model<MatchView>
  ) {}

  async handle(event: MatchWasDeleted) {
    const matchView = new this.matchModel({
      _id: event.id,
    });

    await matchView.save();
  }
}
