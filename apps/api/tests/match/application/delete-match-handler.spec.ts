import { Test, TestingModule } from '@nestjs/testing';

import {
  DeleteMatchCommand,
  DeleteMatchHandler,
} from '../../../src/match/application';
import { MATCHES, Matches, MatchId } from '../../../src/match/domain';
import { MatchBuilder } from '../builders/MatchBuilder';
import faker = require('faker');

describe('Delete match handler', () => {
  let command$: DeleteMatchHandler;
  const matches: Partial<Matches> = {};
  const matchId = MatchId.fromString(faker.datatype.uuid());
  const match = MatchBuilder.random();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteMatchHandler,
        {
          provide: MATCHES,
          useValue: matches,
        },
      ],
    }).compile();

    command$ = module.get<DeleteMatchHandler>(DeleteMatchHandler);
    matches.find = jest.fn().mockResolvedValue(null);
    matches.save = jest.fn();
  });

  it('should delete a match with the provided command', async () => {
    matches.find = jest.fn().mockResolvedValue(match);

    await command$.execute(new DeleteMatchCommand(matchId.value));

    expect(matches.save).toHaveBeenCalledTimes(1);
    expect(matches.save).toHaveBeenCalledWith(match);
  });

  it('should not delete a match if there is no competition with the provided id', async () => {
    await expect(() =>
      command$.execute(new DeleteMatchCommand(match.id.value))
    ).rejects.toThrow();

    expect(matches.save).not.toBeCalled();
  });
});
