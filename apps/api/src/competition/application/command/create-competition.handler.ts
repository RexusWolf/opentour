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
import { CompetitionMapper } from '../../infrastructure/repository/competition.mapper';
import { CreateCompetitionCommand } from './create-competition.command';

@CommandHandler(CreateCompetitionCommand)
export class CreateUserHandler
  implements ICommandHandler<CreateCompetitionCommand> {
  constructor(
    @Inject(COMPETITIONS) private competitions: Competitions,
    private competitionMapper: CompetitionMapper
  ) {}

  async execute(command: CreateCompetitionCommand) {
    const competitionId = CompetitionId.fromString(command.competitionId);
    const name = Username.fromString(command.name);
    const type = CompetitionType.fromString(command.type);
    const sportId = SportId.fromString(command.sportId);
    const moderatorId = UserId.fromString(command.moderatorId);

    if (await this.competitions.find(competitionId)) {
      throw CompetitionIdAlreadyTakenError.with(competitionId);
    }

    if (await this.competitions.findOneByName(name)) {
      throw CompetitionNameAlreadyTakenError.with(name);
    }

    const competition = Competition.add(competitionId, name, type, sportId);
    competition.addModerator(moderatorId);

    this.competitions.save(competition);

    return this.competitionMapper.aggregateToEntity(competition);
  }
}
