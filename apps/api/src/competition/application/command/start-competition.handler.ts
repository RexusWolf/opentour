import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CompetitionIdNotFoundError } from '../../domain/exception';
import { CompetitionId } from '../../domain/model';
import { COMPETITIONS, Competitions } from '../../domain/repository';
import { StartCompetitionCommand } from './start-competition.command';

@CommandHandler(StartCompetitionCommand)
export class StartCompetitionHandler
  implements ICommandHandler<StartCompetitionCommand> {
  constructor(@Inject(COMPETITIONS) private competitions: Competitions) {}

  async execute(command: StartCompetitionCommand) {
    const competitionId = CompetitionId.fromString(command.competitionId);
    const competition = await this.competitions.find(competitionId);

    if (!competition) {
      throw CompetitionIdNotFoundError.with(competitionId);
    }

    competition.start();

    this.competitions.save(competition);
  }
}
