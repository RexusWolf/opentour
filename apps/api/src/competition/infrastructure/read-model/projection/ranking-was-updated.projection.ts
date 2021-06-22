import { Inject } from '@nestjs/common';
import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { MatchWasRegistered } from '../../../../match/domain';
import { RankingView } from '../schema/ranking.schema';

type Team = {
  readonly id: string;
  readonly name: string;
  readonly logo: string;
  readonly matchPlayeds: number;
  readonly victories: number;
  readonly ties: number;
  readonly defeats: number;
  readonly points: number;
  readonly lastFive: string[];
};

@ViewUpdaterHandler(MatchWasRegistered)
export class RankingWasUpdatedProjection
  implements IViewUpdater<MatchWasRegistered> {
  constructor(
    @Inject('RANKING_MODEL')
    private readonly rankingModel: Model<RankingView>
  ) {}

  async handle(event: MatchWasRegistered) {
    const ranking = await this.rankingModel
      .findOne({ competitionId: event.competitionId })
      .exec();

    if (!ranking) return;

    const localTeamIndex = this.getTeamIndex(event.localTeam.id, ranking.teams);
    const visitorTeamIndex = this.getTeamIndex(
      event.visitorTeam.id,
      ranking.teams
    );

    const localTeam = ranking.teams[localTeamIndex];
    const visitorTeam = ranking.teams[visitorTeamIndex];

    const { local, visitor } = this.getTeamsFromResults({
      localTeam,
      visitorTeam,
      localTeamResult: event.localTeam.score,
      visitorTeamResult: event.visitorTeam.score,
    });

    ranking.teams[localTeamIndex] = local;
    ranking.teams[visitorTeamIndex] = visitor;

    await this.rankingModel
      .updateOne({ _id: ranking.id }, { $set: { teams: ranking.teams } })
      .exec();
  }

  private getTeamIndex(teamId: string, teams: Team[]) {
    return teams.findIndex((team) => team.id === teamId);
  }

  private getTeamsFromResults(params: {
    localTeam: Team;
    visitorTeam: Team;
    localTeamResult: number;
    visitorTeamResult: number;
  }) {
    const {
      localTeam,
      visitorTeam,
      localTeamResult,
      visitorTeamResult,
    } = params;

    localTeam.lastFive.shift();
    visitorTeam.lastFive.shift();

    if (localTeamResult === visitorTeamResult) {
      return {
        local: this.getTiedTeam(localTeam),
        visitor: this.getTiedTeam(visitorTeam),
      };
    }

    return localTeamResult > visitorTeamResult
      ? {
          local: this.getWinnerTeam(localTeam),
          visitor: this.getLoserTeam(visitorTeam),
        }
      : {
          local: this.getLoserTeam(localTeam),
          visitor: this.getWinnerTeam(visitorTeam),
        };
  }

  private getWinnerTeam(team: Team): Team {
    return {
      id: team.id,
      name: team.name,
      logo: team.logo,
      matchPlayeds: team.matchPlayeds,
      victories: team.victories + 1,
      ties: team.ties,
      defeats: team.defeats,
      points: team.points + 3,
      lastFive: [...team.lastFive, 'victory'],
    };
  }

  private getLoserTeam(team: Team): Team {
    return {
      id: team.id,
      name: team.name,
      logo: team.logo,
      matchPlayeds: team.matchPlayeds,
      victories: team.victories,
      ties: team.ties,
      defeats: team.defeats + 1,
      points: team.points,
      lastFive: [...team.lastFive, 'defeat'],
    };
  }

  private getTiedTeam(team: Team): Team {
    return {
      id: team.id,
      name: team.name,
      logo: team.logo,
      matchPlayeds: team.matchPlayeds,
      victories: team.victories,
      ties: team.ties + 1,
      defeats: team.defeats,
      points: team.points + 1,
      lastFive: [...team.lastFive, 'tie'],
    };
  }
}
