import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SportName } from '../../../sport/domain/model/sport-name';
import { UserId } from '../../../user/domain';
import { CompetitionIdAlreadyTakenError } from '../../domain/exception/';
import {
  Competition,
  CompetitionId,
  CompetitionName,
  CompetitionType,
} from '../../domain/model';
import { COMPETITIONS, Competitions } from '../../domain/repository';
import { CreateCompetitionCommand } from './create-competition.command';

@CommandHandler(CreateCompetitionCommand)
export class CreateCompetitionHandler
  implements ICommandHandler<CreateCompetitionCommand> {
  constructor(@Inject(COMPETITIONS) private competitions: Competitions) {}

  async execute(command: CreateCompetitionCommand) {
    const competitionId = CompetitionId.fromString(command.id);
    const name = CompetitionName.fromString(command.name);
    const type = CompetitionType.fromString(command.type);
    const sportName = SportName.fromString(command.sportName);
    const moderatorId = UserId.fromString(command.moderatorId);
    if (await this.competitions.find(competitionId)) {
      throw CompetitionIdAlreadyTakenError.with(competitionId);
    }

    const competition = Competition.create({
      id: competitionId,
      name,
      type,
      sportName,
      moderatorId,
    });

    this.competitions.save(competition);
  }
}
