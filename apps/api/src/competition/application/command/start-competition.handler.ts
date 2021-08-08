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
import { StartCompetitionCommand } from './start-competition.command';

@CommandHandler(StartCompetitionCommand)
export class StartCompetitionHandler
  implements ICommandHandler<StartCompetitionCommand>
{
  constructor(
    @Inject(COMPETITIONS) private competitions: Competitions,
    @Inject('TEAM_MODEL')
    private readonly teamModel: Model<TeamView>
  ) {}

  async execute(command: StartCompetitionCommand) {
    const competitionId = CompetitionId.fromString(command.competitionId);
    const competition = await this.competitions.find(competitionId);

    if (!competition) {
      throw CompetitionIdNotFoundError.with(competitionId);
    }

    let currentJourney: string | undefined = undefined;
    if (competition.type.value === COMPETITION_TYPES.TORNEO) {
      const teamsInCompetition = await this.teamModel
        .find({ competitionId: competitionId.value })
        .exec();

      const startingRound = this.getStartingRound(teamsInCompetition.length);

      currentJourney = startingRound;
    }

    competition.start(currentJourney);

    this.competitions.save(competition);
  }

  private getStartingRound(numberOfTeams: number) {
    if (numberOfTeams > 16) {
      return 'Dieciseisavos';
    }
    if (numberOfTeams > 8) {
      return 'Octavos';
    }
    if (numberOfTeams > 4) {
      return 'Cuartos';
    }
    if (numberOfTeams > 2) {
      return 'Semifinal';
    }
    return 'Final';
  }
}
