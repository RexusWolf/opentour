import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SportId } from '../../../sport/domain/model/sport-id';
import { UserId, Username } from '../../../user/domain';
import {
  CompetitionIdAlreadyTakenError,
  CompetitionNameAlreadyTakenError,
} from '../../domain/exception/';
import {
  Competition,
  CompetitionId,
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
    const name = Username.fromString(command.name);
    const type = CompetitionType.fromString(command.type);
    const sportId = SportId.fromString(command.sportId);
    const moderatorId = UserId.fromString(command.moderatorId);
    if (await this.competitions.find(competitionId)) {
      throw CompetitionIdAlreadyTakenError.with(competitionId);
    }

    const competition = Competition.create({
      id: competitionId,
      name,
      type,
      sportId,
      moderatorId,
    });

    this.competitions.save(competition);
  }
}
