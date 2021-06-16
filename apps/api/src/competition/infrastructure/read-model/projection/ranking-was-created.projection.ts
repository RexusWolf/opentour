import { Inject } from '@nestjs/common';
import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

import { CompetitionWasStarted } from '../../../../competition/domain';
import { TeamView } from '../../../../team/infrastructure/read-model/schema/team.schema';
import { RankingView } from '../schema/ranking.schema';

@ViewUpdaterHandler(CompetitionWasStarted)
export class RankingWasCreatedProjection
  implements IViewUpdater<CompetitionWasStarted> {
  constructor(
    @Inject('RANKING_MODEL')
    private readonly rankingModel: Model<RankingView>,
    @Inject('TEAM_MODEL')
    private readonly teamModel: Model<TeamView>
  ) {}

  async handle(event: CompetitionWasStarted) {
    const teamsInCompetition = await this.teamModel.find({
      competitionId: event.id,
    });

    const teamsForRanking = teamsInCompetition.map(this.getRankingForTeam);

    const rankingView = new this.rankingModel({
      _id: uuid(),
      competitionId: event.id,
      teams: teamsForRanking,
    });

    await rankingView.save();
  }

  private getRankingForTeam(team: TeamView) {
    return {
      id: team.id,
      name: team.name,
      logo: team.logo,
      matchPlayeds: 0,
      victories: 0,
      ties: 0,
      defeats: 0,
      points: 0,
      lastFive: ['null', 'null', 'null', 'null', 'null'],
    };
  }
}
