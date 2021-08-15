import {
  Competition,
  CompetitionId,
  CompetitionName,
  SportName,
} from '../../../src/competition/domain';
import { Score } from '../../../src/competition/domain/model/score';
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
      scoreSystem: {
        victory: Score.fromNumber(faker.datatype.number({ min: 0 })),
        tie: Score.fromNumber(faker.datatype.number({ min: 0 })),
        defeat: Score.fromNumber(faker.datatype.number({ min: 0 })),
      },
    });
  }
}
