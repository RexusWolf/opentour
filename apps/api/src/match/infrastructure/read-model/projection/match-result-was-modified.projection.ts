import { Inject, Param } from '@nestjs/common';
import { EventsHandler } from '@nestjs/cqrs';
import { match } from 'assert';
import { IViewUpdater } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { COMPETITION_TYPES } from '../../../../competition/domain';
import { CompetitionView } from '../../../../competition/infrastructure/read-model/schema/competition.schema';
import { TeamView } from '../../../../team/infrastructure/read-model/schema/team.schema';
import { MatchResultWasModified } from '../../../domain';
import { MatchView } from '../schema/match.schema';

@EventsHandler(MatchResultWasModified)
export class MatchResultWasModifiedProjection
  implements IViewUpdater<MatchResultWasModified>
{
  constructor(
    @Inject('MATCH_MODEL')
    private readonly matchModel: Model<MatchView>,
    @Inject('COMPETITION_MODEL')
    private readonly competitionModel: Model<CompetitionView>,
    @Inject('TEAM_MODEL')
    private readonly teamModel: Model<TeamView>
  ) {}

  async handle(event: MatchResultWasModified) {
    await this.matchModel
      .updateOne(
        { _id: event.id },
        {
          'localTeam.score': event.localTeam.score,
          'visitorTeam.score': event.visitorTeam.score,
        }
      )
      .exec();

    const competition = await this.competitionModel
      .findById(event.competitionId)
      .exec();
    if (!competition) {
      throw Error('No competition found with ID');
    }
    if (competition.type === COMPETITION_TYPES.TORNEO) {
      const competitionMatches = await this.matchModel
        .find({ competitionId: event.competitionId })
        .exec();

      if (
        event.index === competitionMatches[competitionMatches.length - 1].index
      )
        return;

      const matchFinished = competitionMatches.find(
        (match) => match.index === event.index
      );

      const nextMatchIndex = this.getNextMatchIndex(
        competitionMatches,
        matchFinished!.journey,
        event.index
      );

      const matchWinnerId = this.getMatchWinnerId(event);

      const matchWinner = await this.teamModel.findById(matchWinnerId).exec();

      const matchWinnerTeam = {
        name: matchWinner!.name,
        logo: matchWinner!.logo,
        score: 0,
      };
      event.index % 2 === 0
        ? await this.matchModel
            .updateOne(
              { _id: competitionMatches[nextMatchIndex].id },
              { $set: { visitorTeam: matchWinnerTeam } }
            )
            .exec()
        : await this.matchModel
            .updateOne(
              { _id: competitionMatches[nextMatchIndex].id },
              {
                localTeam: {
                  name: matchWinner!.name,
                  logo: matchWinner!.logo,
                  score: 0,
                },
              }
            )
            .exec();
    }
  }

  private getMatchWinnerId(event: MatchResultWasModified) {
    if (event.localTeam.score > event.visitorTeam.score)
      return event.localTeam.id;
    return event.visitorTeam.id;
  }

  private getNextMatchIndex(
    matches: MatchView[],
    journey: string,
    matchIndex: number
  ) {
    const matchesWithJourney = matches.filter(
      (match) => match.journey === journey
    );

    const matchesWithJourneyIndexes = matchesWithJourney.map(
      (match) => match.index
    );

    const matchesChunks = this.chunkMatchesArray(matchesWithJourneyIndexes, 2);

    const nextRoundJourneyMatchIndex = matchesChunks.findIndex((matchPair) =>
      matchPair.includes(matchIndex)
    );

    const lastMatchOfRound = matchesWithJourney.pop();

    return nextRoundJourneyMatchIndex + lastMatchOfRound!.index;
  }

  private chunkMatchesArray(array: number[], chunkSize: number) {
    const results: number[][] = [];

    while (array.length) {
      results.push(array.splice(0, chunkSize));
    }

    return results;
  }
}
