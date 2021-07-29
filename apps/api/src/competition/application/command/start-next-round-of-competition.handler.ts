import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';

import { TeamView } from '../../../team/infrastructure/read-model/schema/team.schema';
import {
  COMPETITION_TYPES,
  CompetitionId,
  CompetitionIdNotFoundError,
  COMPETITIONS,
  Competitions,
} from '../../domain';
import { StartNextRoundOfCompetitionCommand } from './start-next-round-of-competition.command';

@CommandHandler(StartNextRoundOfCompetitionCommand)
export class StartNextRoundOfCompetitionHandler
  implements ICommandHandler<StartNextRoundOfCompetitionCommand>
{
  constructor(@Inject(COMPETITIONS) private competitions: Competitions) {}

  async execute(command: StartNextRoundOfCompetitionCommand) {
    const competitionId = CompetitionId.fromString(command.competitionId);
    const competition = await this.competitions.find(competitionId);

    if (!competition) {
      throw CompetitionIdNotFoundError.with(competitionId);
    }

    const currentJourney = competition.currentJourney;
    if (currentJourney) {
      if (currentJourney.value === 'Final') {
        return;
      }
      const nextJourney = this.getNextJourney(
        competition.currentJourney!.value
      );
      if (nextJourney) {
        competition.nextRound(nextJourney);
        this.competitions.save(competition);
      }
    }
  }

  private getNextJourney(journey: string) {
    if (journey === 'Dieciseisavos') return 'Octavos';
    if (journey === 'Octavos') return 'Cuartos';
    if (journey === 'Cuartos') return 'Semifinal';
    if (journey === 'Semifinal') return 'Final';
  }
}
