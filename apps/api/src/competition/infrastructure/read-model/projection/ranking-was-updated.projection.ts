import { Inject } from '@nestjs/common';
import { EventsHandler } from '@nestjs/cqrs';
import { IViewUpdater } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { MatchResultWasModified } from '../../../../match/domain';
import { RankingView } from '../schema/ranking.schema';

type Team = {
  id: string;
  name: string;
  logo: string;
  matchesPlayed: {
    id: string;
    index: number;
    score: number;
    result: string;
  }[];
};

@EventsHandler(MatchResultWasModified)
export class RankingWasUpdatedProjection
  implements IViewUpdater<MatchResultWasModified> {
  constructor(
    @Inject('RANKING_MODEL')
    private readonly rankingModel: Model<RankingView>
  ) {}

  async handle(event: MatchResultWasModified) {
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
      event,
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
    event: MatchResultWasModified;
  }) {
    const { localTeam, visitorTeam, event } = params;

    const localTeamScore = event.localTeam.score;
    const visitorTeamScore = event.visitorTeam.score;

    const existingLocalMatchIndex = localTeam.matchesPlayed.findIndex(
      (match) => match.id === event.id
    );

    const existingVisitorMatchIndex = visitorTeam.matchesPlayed.findIndex(
      (match) => match.id === event.id
    );

    const { localTeamMatch, visitorTeamMatch } = this.getMatches(
      event,
      localTeamScore,
      visitorTeamScore
    );

    existingLocalMatchIndex !== -1
      ? (localTeam.matchesPlayed[existingLocalMatchIndex] = localTeamMatch)
      : localTeam.matchesPlayed.push(localTeamMatch);

    existingVisitorMatchIndex !== -1
      ? (visitorTeam.matchesPlayed[
          existingVisitorMatchIndex
        ] = visitorTeamMatch)
      : visitorTeam.matchesPlayed.push(visitorTeamMatch);

    return {
      local: localTeam,
      visitor: visitorTeam,
    };
  }

  private getMatches(event, localTeamScore, visitorTeamScore) {
    if (localTeamScore === visitorTeamScore) {
      const { localTeamMatch, visitorTeamMatch } = this.getTiedMatches(event);

      return {
        localTeamMatch,
        visitorTeamMatch,
      };
    }
    if (localTeamScore > visitorTeamScore) {
      const { localTeamMatch, visitorTeamMatch } = this.getLocalWonMatches(
        event
      );

      return {
        localTeamMatch,
        visitorTeamMatch,
      };
    }
    const { localTeamMatch, visitorTeamMatch } = this.getLocalLostMatches(
      event
    );

    return {
      localTeamMatch,
      visitorTeamMatch,
    };
  }

  private getLocalWonMatches(event: MatchResultWasModified) {
    return {
      localTeamMatch: {
        id: event.id,
        index: event.index,
        score: event.localTeam.score,
        result: 'victory',
      },
      visitorTeamMatch: {
        id: event.id,
        index: event.index,
        score: event.visitorTeam.score,
        result: 'defeat',
      },
    };
  }

  private getLocalLostMatches(event: MatchResultWasModified) {
    return {
      localTeamMatch: {
        id: event.id,
        index: event.index,
        score: event.localTeam.score,
        result: 'defeat',
      },
      visitorTeamMatch: {
        id: event.id,
        index: event.index,
        score: event.visitorTeam.score,
        result: 'victory',
      },
    };
  }

  private getTiedMatches(event: MatchResultWasModified) {
    return {
      localTeamMatch: {
        id: event.id,
        index: event.index,
        score: event.localTeam.score,
        result: 'tie',
      },
      visitorTeamMatch: {
        id: event.id,
        index: event.index,
        score: event.visitorTeam.score,
        result: 'tie',
      },
    };
  }
}
