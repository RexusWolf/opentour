import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserId } from '../../../user/domain';
import {
  CompetitionIdAlreadyTakenError,
  COMPETITIONS,
  Competitions,
} from '../../domain';
import {
  Competition,
  CompetitionId,
  CompetitionName,
  CompetitionType,
  SportName,
} from '../../domain/model';
import { Score } from '../../domain/model/score';
import { CreateCompetitionCommand } from './create-competition.command';

@CommandHandler(CreateCompetitionCommand)
export class CreateCompetitionHandler
  implements ICommandHandler<CreateCompetitionCommand>
{
  constructor(@Inject(COMPETITIONS) private competitions: Competitions) {}

  async execute(command: CreateCompetitionCommand) {
    const competitionId = CompetitionId.fromString(command.id);
    const name = CompetitionName.fromString(command.name);
    const type = CompetitionType.fromString(command.type);
    const sportName = SportName.fromString(command.sportName);
    const moderatorId = UserId.fromString(command.moderatorId);
    const scoreSystem = {
      victory: Score.fromNumber(command.scoreSystem.victory),
      tie: Score.fromNumber(command.scoreSystem.tie),
      defeat: Score.fromNumber(command.scoreSystem.defeat),
    };
    if (await this.competitions.find(competitionId)) {
      throw CompetitionIdAlreadyTakenError.with(competitionId);
    }

    const competition = Competition.create({
      id: competitionId,
      name,
      type,
      sportName,
      moderatorId,
      scoreSystem,
    });

    this.competitions.save(competition);
  }
}
