import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TeamIdNotFoundError } from '../../domain/exception';
import { TeamId } from '../../domain/model';
import { TEAMS, Teams } from '../../domain/repository';
import { TeamMapper } from '../../infrastructure/repository/team.mapper';
import { DeleteTeamCommand } from './delete-team.command';

@CommandHandler(DeleteTeamCommand)
export class DeleteTeamHandler implements ICommandHandler<DeleteTeamCommand> {
  constructor(
    @Inject(TEAMS) private teams: Teams,
    private teamMapper: TeamMapper
  ) {}

  async execute(command: DeleteTeamCommand) {
    const teamId = TeamId.fromString(command.teamId);

    const team = await this.teams.find(teamId);
    if (!team) {
      throw TeamIdNotFoundError.with(teamId);
    }

    team.delete();

    this.teams.save(team);

    return this.teamMapper.aggregateToEntity(team);
  }
}
