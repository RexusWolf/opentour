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
import { CreateTeamCommand } from './create-team.command';

@CommandHandler(CreateTeamCommand)
export class CreateTeamHandler implements ICommandHandler<CreateTeamCommand> {
  constructor(@Inject(TEAMS) private teams: Teams) {}

  async execute(command: CreateTeamCommand) {
    const id = TeamId.fromString(command.id);
    const competitionId = CompetitionId.fromString(command.competitionId);
    const name = TeamName.fromString(command.name);
    const captainId = UserId.fromString(command.captainId);

    if (await this.teams.find(id)) {
      throw TeamIdAlreadyTakenError.with(id);
    }

    if (await this.teams.findOneByName(name)) {
      throw TeamNameAlreadyTakenError.with(name);
    }

    const team = Team.create({ id, competitionId, name, captainId });

    this.teams.save(team);
  }
}
