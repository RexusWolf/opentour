import {
  Competition,
  CompetitionId,
  CompetitionName,
} from '../../../src/competition/domain';
import { SportName } from '../../../src/sport/domain';
import { UserId } from '../../../src/user/domain';
import { CompetitionTypeBuilder } from './CompetitionTypeBuilder';
import faker = require('faker');

export class CompetitionBuilder {
  static random(): Competition {
    return Competition.create({
      id: CompetitionId.fromString(faker.datatype.uuid()),
      name: CompetitionName.fromString(faker.name.title()),
      type: CompetitionTypeBuilder.random(),
      sportName: SportName.fromString(faker.datatype.uuid()),
      moderatorId: UserId.fromString(faker.datatype.uuid()),
    });
  }
}
