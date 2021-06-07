import { CreateCompetitionCommand } from '../../../src/competition/application';
import {
  Competition,
  CompetitionId,
  CompetitionName,
  CompetitionType,
} from '../../../src/competition/domain/model';
import { SportId } from '../../../src/sport/domain/model';
import { UserId } from '../../../src/user/domain';
import faker = require('faker');

export class CompetitionBuilder {
  private id: CompetitionId;
  private name: CompetitionName;
  private type: CompetitionType;
  private sportId: SportId;
  private moderatorIds: UserId[];
  private hasStarted: boolean;
  private deleted?: Date;

  constructor() {
    this.id = CompetitionId.fromString(faker.datatype.uuid());
    this.name = CompetitionName.fromString(faker.random.word());
    this.type = CompetitionType.fromString(faker.random.word());
    this.sportId = SportId.fromString(faker.datatype.uuid());
    this.moderatorIds = [UserId.fromString(faker.datatype.uuid())];
  }

  withId(competitionId: CompetitionId): CompetitionBuilder {
    this.id = competitionId;
    return this;
  }

  static fromCommand(command: CreateCompetitionCommand) {
    return Competition.create({
      id: CompetitionId.fromString(command.id),
      name: CompetitionName.fromString(command.name),
      type: CompetitionType.fromString(command.type),
      sportId: SportId.fromString(command.sportId),
      moderatorId: UserId.fromString(command.moderatorId),
    });
  }

  build(): Competition {
    return Competition.create({
      id: this.id,
      name: this.name,
      type: this.type,
      sportId: this.sportId,
      moderatorId: this.moderatorIds[0],
    });
  }
}
