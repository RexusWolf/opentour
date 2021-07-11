import { Inject } from '@nestjs/common';
import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';

import { COMPETITION_TYPES } from '../../../competition/domain';
import { CompetitionView } from '../../../competition/infrastructure/read-model/schema/competition.schema';
import { TeamView } from '../../../team/infrastructure/read-model/schema/team.schema';
import { UpdateMatchCommand } from '../../application';
import { MatchResultWasModified } from '../../domain';
import { MatchView } from '../read-model/schema/match.schema';

@EventsHandler(MatchResultWasModified)
export class MatchResultWasModifiedSaga
  implements IEventHandler<MatchResultWasModified>
{
  constructor(
    private readonly commandBus: CommandBus,
    @Inject('MATCH_MODEL')
    private readonly matchModel: Model<MatchView>,
    @Inject('COMPETITION_MODEL')
    private readonly competitionModel: Model<CompetitionView>
  ) {}

  async handle(event: MatchResultWasModified) {
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
      ) {
        return;
      }

      const matchFinished = competitionMatches.find(
        (match) => match.index === event.index
      );

      const nextMatchIndex = this.getNextMatchIndex(
        competitionMatches,
        matchFinished!.journey,
        event.index
      );

      const matchWinnerId = this.getMatchWinnerId(event);

      event.index % 2 === 0
        ? this.commandBus.execute(
            new UpdateMatchCommand(competitionMatches[nextMatchIndex].id, {
              visitorTeamId: matchWinnerId,
            })
          )
        : this.commandBus.execute(
            new UpdateMatchCommand(competitionMatches[nextMatchIndex].id, {
              localTeamId: matchWinnerId,
            })
          );
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
