import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CompetitionId } from '../../../competition/domain/model';
import { UserId } from '../../../user/domain';
import {
  TeamIdAlreadyTakenError,
  TeamNameAlreadyTakenError,
} from '../../domain/exception/';
import { Team, TeamId, TeamName } from '../../domain/model';
import { TEAMS, Teams } from '../../domain/repository';
import { TeamMapper } from '../../infrastructure/repository/team.mapper';
import { CreateTeamCommand } from './create-team.command';

@CommandHandler(CreateTeamCommand)
export class CreateTeamHandler implements ICommandHandler<CreateTeamCommand> {
  constructor(
    @Inject(TEAMS) private teams: Teams,
    private teamMapper: TeamMapper
  ) {}

  async execute(command: CreateTeamCommand) {
    const teamId = TeamId.fromString(command.teamId);
    const competitionId = CompetitionId.fromString(command.competitionId);
    const name = TeamName.fromString(command.name);
    const captainId = UserId.fromString(command.captainId);

    if (await this.teams.find(teamId)) {
      throw TeamIdAlreadyTakenError.with(teamId);
    }

    if (await this.teams.findOneByName(name)) {
      throw TeamNameAlreadyTakenError.with(name);
    }

    const team = Team.add(teamId, competitionId, name, captainId);
    team.addMember(captainId);

    this.teams.save(team);

    return this.teamMapper.aggregateToEntity(team);
  }
}
