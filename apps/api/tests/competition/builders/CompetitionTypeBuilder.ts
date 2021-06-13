import {
  COMPETITION_TYPES,
  CompetitionType,
} from '../../../src/competition/domain';
import faker = require('faker');

const competitionTypes = Object.keys(COMPETITION_TYPES);

export class CompetitionTypeBuilder {
  static random(): CompetitionType {
    const randomPosition = faker.datatype.number(competitionTypes.length - 1);

    return CompetitionType.fromString(competitionTypes[randomPosition]);
  }
}
