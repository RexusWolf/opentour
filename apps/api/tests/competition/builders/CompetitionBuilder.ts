import {
  Competition,
  CompetitionId,
  CompetitionName,
  CompetitionType,
} from '../../../src/competition/domain/model';
import { SportName } from '../../../src/sport/domain/model';
import { UserId } from '../../../src/user/domain';
import { CompetitionTypeBuilder } from './CompetitionTypeBuilder';
import faker = require('faker');

export class CompetitionBuilder {
  private id: CompetitionId;
  private name: CompetitionName;
  private type: CompetitionType;
  private sportName: SportName;
  private moderatorIds: UserId[];
  private hasStarted: boolean;
  private deleted?: Date;

  constructor() {
    this.id = CompetitionId.fromString(faker.datatype.uuid());
    this.name = CompetitionName.fromString(faker.name.title());
    this.type = CompetitionTypeBuilder.random();
    this.sportName = SportName.fromString(faker.datatype.uuid());
    this.moderatorIds = [UserId.fromString(faker.datatype.uuid())];
  }

  withId(competitionId: CompetitionId): CompetitionBuilder {
    this.id = competitionId;
    return this;
  }

  build(): Competition {
    return Competition.create({
      id: this.id,
      name: this.name,
      type: this.type,
      sportName: this.sportName,
      moderatorId: this.moderatorIds[0],
    });
  }
}
