import { CreateCompetitionCommand } from '../../../src/competition/application';
import {
  Competition,
  CompetitionId,
  CompetitionName,
  CompetitionType,
} from '../../../src/competition/domain/model';
import { SportId } from '../../../src/sport/domain/model';
import { UserId } from '../../../src/user/domain';

export class CompetitionBuilder {
  static fromCommand(command: CreateCompetitionCommand) {
    return Competition.create({
      id: CompetitionId.fromString(command.competitionId),
      name: CompetitionName.fromString(command.name),
      type: CompetitionType.fromString(command.type),
      sportId: SportId.fromString(command.sportId),
      moderatorId: UserId.fromString(command.moderatorId),
    });
  }
}
