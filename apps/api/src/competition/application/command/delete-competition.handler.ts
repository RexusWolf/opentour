import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CompetitionIdNotFoundError } from '../../domain/exception';
import { CompetitionId } from '../../domain/model';
import { COMPETITIONS, Competitions } from '../../domain/repository';
import { DeleteCompetitionCommand } from './delete-competition.command';

@CommandHandler(DeleteCompetitionCommand)
export class DeleteCompetitionHandler
  implements ICommandHandler<DeleteCompetitionCommand> {
  constructor(@Inject(COMPETITIONS) private competitions: Competitions) {}

  async execute(command: DeleteCompetitionCommand) {
    const competitionId = CompetitionId.fromString(command.competitionId);

    const competition = await this.competitions.find(competitionId);
    if (!competition) {
      throw CompetitionIdNotFoundError.with(competitionId);
    }

    competition.delete();

    this.competitions.save(competition);
  }
}
