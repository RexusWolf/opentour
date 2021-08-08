import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  CompetitionIdNotFoundError,
  Competitions,
  COMPETITIONS,
} from '../../../competition/domain';

import { TeamId, TeamIdNotFoundError, TEAMS, Teams } from '../../domain';
import { DeleteTeamCommand } from './delete-team.command';

@CommandHandler(DeleteTeamCommand)
export class DeleteTeamHandler implements ICommandHandler<DeleteTeamCommand> {
  constructor(
    @Inject(TEAMS) private teams: Teams,
    @Inject(COMPETITIONS) private competitions: Competitions
  ) {}

  async execute(command: DeleteTeamCommand) {
    const teamId = TeamId.fromString(command.teamId);

    const team = await this.teams.find(teamId);
    if (!team) {
      throw TeamIdNotFoundError.with(teamId);
    }
    const competition = await this.competitions.find(team.competitionId);

    if (!competition) {
      throw CompetitionIdNotFoundError.with(team.competitionId);
    }

    if (competition.hasStarted) {
      throw Error(`You can't delete a team if the competition has started.`);
    }

    team.delete();

    this.teams.save(team);
  }
}
