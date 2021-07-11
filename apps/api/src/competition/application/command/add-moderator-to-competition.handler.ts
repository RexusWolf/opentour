import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  Email,
  EmailNotFoundError,
  UserId,
  USERS,
  Users,
} from '../../../user/domain';
import {
  CompetitionIdNotFoundError,
  COMPETITIONS,
  Competitions,
} from '../../domain';
import { CompetitionId } from '../../domain/model';
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

    const moderatorEmail = Email.fromString(command.moderatorEmail);

    const user = await this.users.findOneByEmail(moderatorEmail);
    if (!user) {
      throw EmailNotFoundError.with(moderatorEmail);
    }

    competition.addModerator(UserId.fromString(command.id));

    this.competitions.save(competition);
  }
}
