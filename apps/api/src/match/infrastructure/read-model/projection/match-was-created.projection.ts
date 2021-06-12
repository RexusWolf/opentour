import { Inject } from '@nestjs/common';
import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { MatchWasCreated } from '../../../domain/event';
import { MatchView } from '../schema/match.schema';

@ViewUpdaterHandler(MatchWasCreated)
export class MatchWasCreatedProjection
  implements IViewUpdater<MatchWasCreated> {
  constructor(
    @Inject('MATCH_MODEL')
    private readonly matchModel: Model<MatchView>
  ) {}

  async handle(event: MatchWasCreated) {
    const matchView = new this.matchModel({
      _id: event.id,
      competitionId: event.competitionId,
      index: event.index,
      journey: event.journey,
      localTeamId: event.localTeamId,
      visitorTeamId: event.visitorTeamId,
      date: null,
      result: {
        localTeamScore: 0,
        visitorTeamScore: 0,
      },
      deleted: null,
    });

    await matchView.save();
  }
}
