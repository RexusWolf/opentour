import { Test, TestingModule } from '@nestjs/testing';

import {
  DeleteCompetitionCommand,
  DeleteCompetitionHandler,
} from '../../../src/competition/application';
import { CompetitionId } from '../../../src/competition/domain/model';
import {
  COMPETITIONS,
  Competitions,
} from '../../../src/competition/domain/repository';
import { CompetitionBuilder } from '../builders/CompetitionBuilder';
import faker = require('faker');

describe('Delete competition handler', () => {
  let command$: DeleteCompetitionHandler;
  const competitions: Partial<Competitions> = {};
  const competitionId = CompetitionId.fromString(faker.datatype.uuid());
  const competition = new CompetitionBuilder().withId(competitionId).build();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteCompetitionHandler,
        {
          provide: COMPETITIONS,
          useValue: competitions,
        },
      ],
    }).compile();

    command$ = module.get<DeleteCompetitionHandler>(DeleteCompetitionHandler);
    competitions.find = jest.fn().mockResolvedValue(null);
    competitions.save = jest.fn();
  });

  it('should delete a competition with the provided command', async () => {
    competitions.find = jest.fn().mockResolvedValue(competition);

    await command$.execute(new DeleteCompetitionCommand(competitionId.value));

    expect(competitions.save).toHaveBeenCalledTimes(1);
    expect(competitions.save).toHaveBeenCalledWith(competition);
  });
});
