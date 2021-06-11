import { Test, TestingModule } from '@nestjs/testing';

import {
  UpdateCompetitionCommand,
  UpdateCompetitionHandler,
} from '../../../src/competition/application';
import {
  COMPETITIONS,
  Competitions,
} from '../../../src/competition/domain/repository';
import { CompetitionBuilder } from '../builders/CompetitionBuilder';

describe('Update competition handler', () => {
  let command$: UpdateCompetitionHandler;
  const competitions: Partial<Competitions> = {};

  const competition = new CompetitionBuilder().build();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateCompetitionHandler,
        {
          provide: COMPETITIONS,
          useValue: competitions,
        },
      ],
    }).compile();

    command$ = module.get<UpdateCompetitionHandler>(UpdateCompetitionHandler);
    competitions.find = jest.fn().mockResolvedValue(null);
    competitions.save = jest.fn();
  });

  it('should update the found competition for the given id', async () => {
    competitions.find = jest.fn().mockResolvedValue(competition);

    await command$.execute(
      new UpdateCompetitionCommand({
        id: competition.id.value,
        name: competition.name.value,
        moderatorIds: [competition.moderatorIds[0].value],
      })
    );

    expect(competitions.save).toHaveBeenCalledWith(competition);
    expect(competitions.save).toHaveBeenCalledTimes(1);
  });
  it('should not update the competition if it is not found', async () => {
    await expect(() =>
      command$.execute(
        new UpdateCompetitionCommand({
          id: competition.id.value,
          name: competition.name.value,
          moderatorIds: [competition.moderatorIds[0].value],
        })
      )
    ).rejects.toThrow();

    expect(competitions.save).not.toHaveBeenCalled();
  });
});
