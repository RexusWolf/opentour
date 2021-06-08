import { Test, TestingModule } from '@nestjs/testing';

import {
  CreateCompetitionCommand,
  CreateCompetitionHandler,
} from '../../../src/competition/application';
import {
  COMPETITIONS,
  Competitions,
} from '../../../src/competition/domain/repository';
import { CompetitionBuilder } from '../builders/CompetitionBuilder';

describe('Create competition handler', () => {
  let command$: CreateCompetitionHandler;
  const competitions: Partial<Competitions> = {};

  const competition = new CompetitionBuilder().build();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCompetitionHandler,
        {
          provide: COMPETITIONS,
          useValue: competitions,
        },
      ],
    }).compile();

    command$ = module.get<CreateCompetitionHandler>(CreateCompetitionHandler);
    competitions.find = jest.fn().mockResolvedValue(null);
    competitions.save = jest.fn();
  });

  it('should create a new competition', async () => {
    await command$.execute(
      new CreateCompetitionCommand({
        id: competition.id.value,
        name: competition.name.value,
        moderatorId: competition.moderatorIds[0].value,
        type: competition.type.value,
        sportId: competition.sportId.value,
      })
    );

    expect(competitions.save).toHaveBeenCalledTimes(1);
  });
  it('should not create a competition if there is an existing competition with same id', async () => {
    competitions.find = jest.fn().mockResolvedValue(competition);

    await expect(() =>
      command$.execute(
        new CreateCompetitionCommand({
          id: competition.id.value,
          name: competition.name.value,
          moderatorId: competition.moderatorIds[0].value,
          type: competition.type.value,
          sportId: competition.sportId.value,
        })
      )
    ).rejects.toThrow();

    expect(competitions.save).not.toHaveBeenCalled();
  });
});
