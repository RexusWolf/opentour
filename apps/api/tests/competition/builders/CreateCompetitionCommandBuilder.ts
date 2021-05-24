import * as faker from 'faker';

import { CreateCompetitionCommand } from '../../../src/competition/application';

export class CreateCompetitionCommandBuilder {
  static random() {
    return new CreateCompetitionCommand({
      competitionId: faker.datatype.uuid(),
      name: faker.random.word(),
      moderatorId: faker.datatype.uuid(),
      sportId: faker.datatype.uuid(),
      type: faker.random.word(),
    });
  }
}
