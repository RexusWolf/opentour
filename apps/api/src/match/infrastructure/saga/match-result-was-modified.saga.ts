import { Inject } from '@nestjs/common';
import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AnyRecord } from 'dns';
import { Model } from 'mongoose';

import { COMPETITION_TYPES } from '../../../competition/domain';
import { CompetitionView } from '../../../competition/infrastructure/read-model/schema/competition.schema';
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

      const finalMatch = competitionMatches.find(
        (match) => match.journey === 'Final'
      );

      if (event.id === finalMatch!.id) {
        return;
      }

      const matchFinished = competitionMatches.find(
        (match) => match.id === event.id
      );

      const nextMatchId = this.getNextMatchId(
        competitionMatches,
        matchFinished!.journey,
        matchFinished!.index
      );

      const matchWinnerId = this.getMatchWinnerId(event);

      const numberOfNextJourneyMatches = this.getNumberOfNextJourneyMatches(
        competitionMatches,
        matchFinished!.journey
      );

      event.index <= numberOfNextJourneyMatches - 1
        ? this.commandBus.execute(
            new UpdateMatchCommand(nextMatchId, {
              localTeamId: matchWinnerId,
            })
          )
        : this.commandBus.execute(
            new UpdateMatchCommand(nextMatchId, {
              visitorTeamId: matchWinnerId,
            })
          );
    }
  }

  private getMatchWinnerId(event: MatchResultWasModified) {
    if (event.localTeam.score > event.visitorTeam.score)
      return event.localTeam.id;
    return event.visitorTeam.id;
  }

  private getNextJourney(journey: string) {
    if (journey === 'Dieciseisavos') {
      return 'Octavos';
    }
    if (journey === 'Octavos') {
      return 'Cuartos';
    }
    if (journey === 'Cuartos') {
      return 'Semifinal';
    }
    if (journey === 'Semifinal') {
      return 'Final';
    }
  }

  private getNextMatchId(
    matches: MatchView[],
    previousMatchJourney: string,
    previousMatchIndex: number
  ) {
    const nextJourney = this.getNextJourney(previousMatchJourney);

    const nextJourneyMatches = matches.filter(
      (match) => match.journey === nextJourney
    );

    const nextMatchIndex = previousMatchIndex % nextJourneyMatches.length;
    const match = nextJourneyMatches.find(
      (match) => match.index === nextMatchIndex
    );

    return match!.id;
  }

  private getNumberOfNextJourneyMatches(
    matches: MatchView[],
    previousMatchJourney: string
  ) {
    const nextJourney = this.getNextJourney(previousMatchJourney);
    const nextJourneyMatches = matches.filter(
      (match) => match.journey === nextJourney
    );
    return nextJourneyMatches.length;
  }
}
