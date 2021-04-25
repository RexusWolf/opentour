import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserId } from '../../../user/domain';
import { TeamIdNotFoundError } from '../../domain/exception';
import { Team, TeamId } from '../../domain/model';
import { TEAMS, Teams } from '../../domain/repository';
import { TeamMapper } from '../../infrastructure/repository/team.mapper';
import { UpdateTeamCommand } from './update-team.command';

@CommandHandler(UpdateTeamCommand)
export class UpdateTeamHandler implements ICommandHandler<UpdateTeamCommand> {
  constructor(
    @Inject(TEAMS) private teams: Teams,
    private teamMapper: TeamMapper
  ) {}

  async execute(command: UpdateTeamCommand) {
    const teamId = TeamId.fromString(command.teamId);

    const team = await this.teams.find(teamId);
    if (!team) {
      throw TeamIdNotFoundError.with(teamId);
    }

    this.updateMembers(team, command);

    this.teams.save(team);

    return this.teamMapper.aggregateToEntity(team);
  }

  private updateMembers(team: Team, command: UpdateTeamCommand) {
    team.membersIds.map(
      (memberId) =>
        !command.membersIds.includes(memberId.value) &&
        team.removeMember(memberId)
    );
    command.membersIds.map((memberId) =>
      team.addMember(UserId.fromString(memberId))
    );
  }
}
