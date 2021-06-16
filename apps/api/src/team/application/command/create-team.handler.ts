import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CompetitionId } from '../../../competition/domain';
import { UserId } from '../../../user/domain';
import {
  Team,
  TeamId,
  TeamIdAlreadyTakenError,
  TeamName,
  TEAMS,
  Teams,
} from '../../domain';
import { TeamLogo } from '../../domain/model/team-logo';
import { CreateTeamCommand } from './create-team.command';

@CommandHandler(CreateTeamCommand)
export class CreateTeamHandler implements ICommandHandler<CreateTeamCommand> {
  constructor(@Inject(TEAMS) private teams: Teams) {}

  async execute(command: CreateTeamCommand) {
    const id = TeamId.fromString(command.id);
    const competitionId = CompetitionId.fromString(command.competitionId);
    const name = TeamName.fromString(command.name);
    const captainId = UserId.fromString(command.captainId);
    const logo = TeamLogo.fromString(command.logo);

    if (await this.teams.find(id)) {
      throw TeamIdAlreadyTakenError.with(id);
    }

    const team = Team.create({ id, competitionId, name, captainId, logo });

    this.teams.save(team);
  }
}
