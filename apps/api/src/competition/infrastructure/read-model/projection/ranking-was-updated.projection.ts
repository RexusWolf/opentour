import { Inject } from '@nestjs/common';
import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { MatchWasRegistered } from '../../../../match/domain';
import { RankingView } from '../schema/ranking.schema';

type Team = {
  readonly id: string;
  readonly name: string;
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
      console.log('Hey');
      return {
        local: {
          id: localTeam.id,
          name: localTeam.name,
          matchPlayeds: localTeam.matchPlayeds,
          victories: localTeam.victories + 1,
          ties: localTeam.ties,
          defeats: localTeam.defeats,
          points: localTeam.points + 1,
          lastFive: [...localTeam.lastFive, 'tie'],
        },
        visitor: {
          id: visitorTeam.id,
          name: visitorTeam.name,
          matchPlayeds: visitorTeam.matchPlayeds,
          victories: visitorTeam.victories + 1,
          ties: visitorTeam.ties,
          defeats: visitorTeam.defeats,
          points: visitorTeam.points + 1,
          lastFive: [...visitorTeam.lastFive, 'tie'],
        },
      };
    }

    return localTeamResult > visitorTeamResult
      ? {
          local: {
            id: localTeam.id,
            name: localTeam.name,
            matchPlayeds: localTeam.matchPlayeds,
            victories: localTeam.victories + 1,
            ties: localTeam.ties,
            defeats: localTeam.defeats,
            points: localTeam.points + 3,
            lastFive: [...localTeam.lastFive, 'victory'],
          },
          visitor: {
            id: visitorTeam.id,
            name: visitorTeam.name,
            matchPlayeds: visitorTeam.matchPlayeds,
            victories: visitorTeam.victories,
            ties: visitorTeam.ties,
            defeats: visitorTeam.defeats + 1,
            points: visitorTeam.points,
            lastFive: [...visitorTeam.lastFive, 'defeat'],
          },
        }
      : {
          local: {
            id: localTeam.id,
            name: localTeam.name,
            matchPlayeds: localTeam.matchPlayeds,
            victories: localTeam.victories,
            ties: localTeam.ties,
            defeats: localTeam.defeats + 1,
            points: localTeam.points,
            lastFive: [...localTeam.lastFive, 'defeat'],
          },
          visitor: {
            id: visitorTeam.id,
            name: visitorTeam.name,
            matchPlayeds: visitorTeam.matchPlayeds,
            victories: visitorTeam.victories + 1,
            ties: visitorTeam.ties,
            defeats: visitorTeam.defeats,
            points: visitorTeam.points + 3,
            lastFive: [...visitorTeam.lastFive, 'victory'],
          },
        };
  }
}
