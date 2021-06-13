import { Test, TestingModule } from '@nestjs/testing';

import {
  CreateMatchCommand,
  CreateMatchHandler,
} from '../../../src/match/application';
import { MATCHES, Matches } from '../../../src/match/domain/repository';
import { MatchBuilder } from '../builders/MatchBuilder';

// eslint-disable @typescript-eslint/no-non-null-assertion
describe('Create match handler', () => {
  let command$: CreateMatchHandler;
  const matches: Partial<Matches> = {};

  const match = new MatchBuilder().build();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateMatchHandler,
        {
          provide: MATCHES,
          useValue: matches,
        },
      ],
    }).compile();

    command$ = module.get<CreateMatchHandler>(CreateMatchHandler);
    matches.find = jest.fn().mockResolvedValue(null);
    matches.save = jest.fn();
  });

  it('should create a new match', async () => {
    await command$.execute(
      new CreateMatchCommand({
        id: match.id.value,
        competitionId: match.competitionId.value,
        visitorTeamId: match.visitorTeamId.value,
        localTeamId: match.localTeamId.value,
        index: match.index.value,
        journey: match.journey!.value,
      })
    );

    expect(matches.save).toHaveBeenCalledTimes(1);
  });
  it('should not create a match if there is an existing match with same id', async () => {
    matches.find = jest.fn().mockResolvedValue(match);

    await expect(() =>
      command$.execute(
        new CreateMatchCommand({
          id: match.id.value,
          competitionId: match.competitionId.value,
          visitorTeamId: match.visitorTeamId.value,
          localTeamId: match.localTeamId.value,
          index: match.index.value,
          journey: match.journey!.value,
        })
      )
    ).rejects.toThrow();

    expect(matches.save).not.toHaveBeenCalled();
  });
});
