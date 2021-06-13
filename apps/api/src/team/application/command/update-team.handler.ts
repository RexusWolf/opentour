import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserId } from '../../../user/domain';
import { Team, TeamId, TeamIdNotFoundError,TEAMS, Teams  } from '../../domain';
import { UpdateTeamCommand } from './update-team.command';

@CommandHandler(UpdateTeamCommand)
export class UpdateTeamHandler implements ICommandHandler<UpdateTeamCommand> {
  constructor(@Inject(TEAMS) private teams: Teams) {}

  async execute(command: UpdateTeamCommand) {
    const teamId = TeamId.fromString(command.teamId);

    const team = await this.teams.find(teamId);
    if (!team) {
      throw TeamIdNotFoundError.with(teamId);
    }

    this.updateMembers(team, command);

    this.teams.save(team);
  }

  private updateMembers(team: Team, command: UpdateTeamCommand) {
    team.membersIds?.map(
      (memberId) =>
        !command.membersIds.includes(memberId.value) &&
        team.removeMember(memberId)
    );
    command.membersIds.map((memberId) =>
      team.addMember(UserId.fromString(memberId))
    );
  }
}
