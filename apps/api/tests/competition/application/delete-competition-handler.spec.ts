import { Test, TestingModule } from '@nestjs/testing';

import {
  DeleteCompetitionCommand,
  DeleteCompetitionHandler,
} from '../../../src/competition/application';
import { COMPETITIONS, Competitions } from '../../../src/competition/domain';
import { CompetitionBuilder } from '../builders/CompetitionBuilder';

describe('Delete competition handler', () => {
  let command$: DeleteCompetitionHandler;
  const competitions: Partial<Competitions> = {};
  const competition = CompetitionBuilder.random();

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

  it('should delete a competition with the provided id', async () => {
    competitions.find = jest.fn().mockResolvedValue(competition);

    await command$.execute(new DeleteCompetitionCommand(competition.id.value));

    expect(competitions.save).toHaveBeenCalledTimes(1);
    expect(competitions.save).toHaveBeenCalledWith(competition);
  });

  it('should not delete a competition if there is no competition with the provided id', async () => {
    await expect(() =>
      command$.execute(new DeleteCompetitionCommand(competition.id.value))
    ).rejects.toThrow();

    expect(competitions.save).not.toHaveBeenCalled();
  });
});
