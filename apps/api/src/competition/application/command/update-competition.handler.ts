import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CompetitionId, CompetitionIdNotFoundError,COMPETITIONS, Competitions  } from '../../domain';
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

    competition.update(command);

    this.competitions.save(competition);
  }
}
