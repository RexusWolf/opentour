import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SportName } from '../../../sport/domain/model';
import { EmailNotFoundError, UserId, USERS,Users } from '../../../user/domain';
import {
  CompetitionIdAlreadyTakenError,
  CompetitionIdNotFoundError,
  COMPETITIONS,
  Competitions,
} from '../../domain';
import {
  Competition,
  CompetitionId,
  CompetitionName,
  CompetitionType,
} from '../../domain/model';
import { Score } from '../../domain/model/score';
import { AddModeratorToCompetitionCommand } from './add-moderator-to-competition.command';

@CommandHandler(AddModeratorToCompetitionCommand)
export class AddModeratorToCompetitionHandler
  implements ICommandHandler<AddModeratorToCompetitionCommand>
{
  constructor(
    @Inject(COMPETITIONS) private competitions: Competitions,
    @Inject(USERS) private users: Users
  ) {}

  async execute(command: AddModeratorToCompetitionCommand) {
    const competitionId = CompetitionId.fromString(command.id);

    const competition = await this.competitions.find(competitionId);
    if (!competition) {
      throw CompetitionIdNotFoundError.with(competitionId);
    }

    const moderatorEmail = UserId.fromString(command.moderatorEmail);

    const user = await this.users.findOneByEmail(moderatorEmail);
    if (!user) {
      throw EmailNotFoundError.with(moderatorEmail);
    }

    competition.addModerator(user.id);

    this.competitions.save(competition);
  }
}
