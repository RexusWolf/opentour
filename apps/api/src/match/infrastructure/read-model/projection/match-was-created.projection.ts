import { Inject } from '@nestjs/common';
import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { TeamView } from '../../../../team/infrastructure/read-model/schema/team.schema';
import { MatchWasCreated } from '../../../domain';
import { MatchView } from '../schema/match.schema';

@ViewUpdaterHandler(MatchWasCreated)
export class MatchWasCreatedProjection
  implements IViewUpdater<MatchWasCreated> {
  constructor(
    @Inject('MATCH_MODEL')
    private readonly matchModel: Model<MatchView>,

    @Inject('TEAM_MODEL')
    private readonly teamModel: Model<TeamView>
  ) {}

  async handle(event: MatchWasCreated) {
    const localTeam = await this.teamModel.findById(event.localTeamId).exec();
    const visitorTeam = await this.teamModel
      .findById(event.visitorTeamId)
      .exec();

    const matchView = new this.matchModel({
      _id: event.id,
      competitionId: event.competitionId,
      index: event.index,
      journey: event.journey,
      localTeam: { id: event.localTeamId, name: localTeam?.name, score: 0 },
      visitorTeam: { id: event.localTeamId, name: visitorTeam?.name, score: 0 },
      date: null,
      finished: null,
    });

    await matchView.save();
  }
}
