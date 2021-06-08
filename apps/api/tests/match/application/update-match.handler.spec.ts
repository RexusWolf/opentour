import { Test, TestingModule } from '@nestjs/testing';

import {
  UpdateMatchCommand,
  UpdateMatchHandler,
} from '../../../src/match/application';
import { MatchResult, TeamScore } from '../../../src/match/domain';
import { MATCHES, Matches } from '../../../src/match/domain/repository';
import { TeamId } from '../../../src/team/domain/model';
import { MatchBuilder } from '../builders/MatchBuilder';
import faker = require('faker');

describe('Update match handler', () => {
  let command$: UpdateMatchHandler;
  const matches: Partial<Matches> = {};

  const match = new MatchBuilder().build();
  const localTeamId = TeamId.fromString(faker.datatype.uuid());
  const visitorTeamId = TeamId.fromString(faker.datatype.uuid());
  const date = faker.datatype.datetime();
  const result: MatchResult = new MatchResult({
    localTeamScore: TeamScore.fromNumber(faker.datatype.number()),
    visitorTeamScore: TeamScore.fromNumber(faker.datatype.number()),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateMatchHandler,
        {
          provide: MATCHES,
          useValue: matches,
        },
      ],
    }).compile();

    command$ = module.get<UpdateMatchHandler>(UpdateMatchHandler);
    matches.find = jest.fn().mockResolvedValue(null);
    matches.save = jest.fn();
  });

  it('should update the found match for the given id', async () => {
    matches.find = jest.fn().mockResolvedValue(match);

    await command$.execute(
      new UpdateMatchCommand({
        id: match.id.value,
        localTeamId: localTeamId.value,
        visitorTeamId: visitorTeamId.value,
        date: date,
        result: result,
      })
    );

    expect(matches.save).toHaveBeenCalledTimes(1);
  });
  it('should not update the match if it is not found', async () => {
    await expect(() =>
      command$.execute(
        new UpdateMatchCommand({
          id: match.id.value,
          localTeamId: localTeamId.value,
          visitorTeamId: visitorTeamId.value,
          date: date,
          result: result,
        })
      )
    ).rejects.toThrow();

    expect(matches.save).not.toHaveBeenCalled();
  });
});
