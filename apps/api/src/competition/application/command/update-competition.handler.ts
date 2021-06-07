import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserId } from '../../../user/domain';
import { CompetitionIdNotFoundError } from '../../domain/exception';
import { Competition, CompetitionId } from '../../domain/model';
import { COMPETITIONS, Competitions } from '../../domain/repository';
import { UpdateCompetitionCommand } from './update-competition.command';

@CommandHandler(UpdateCompetitionCommand)
export class UpdateCompetitionHandler
  implements ICommandHandler<UpdateCompetitionCommand> {
  constructor(@Inject(COMPETITIONS) private competitions: Competitions) {}

  async execute(command: UpdateCompetitionCommand) {
    const competitionId = CompetitionId.fromString(command.competitionId);

    const competition = await this.competitions.find(competitionId);
    if (!competition) {
      throw CompetitionIdNotFoundError.with(competitionId);
    }

    this.updateModerators(competition, command);

    this.competitions.save(competition);
  }

  private updateModerators(
    competition: Competition,
    command: UpdateCompetitionCommand
  ) {
    competition.moderatorIds.map(
      (moderatorId) =>
        !command.moderatorIds.includes(moderatorId.value) &&
        competition.removeModerator(moderatorId)
    );
    command.moderatorIds.map((moderatorId) =>
      competition.addModerator(UserId.fromString(moderatorId))
    );
  }
}
