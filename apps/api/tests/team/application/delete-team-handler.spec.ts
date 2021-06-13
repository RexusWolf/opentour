import { Test, TestingModule } from '@nestjs/testing';

import {
  DeleteTeamCommand,
  DeleteTeamHandler,
} from '../../../src/team/application';
import { TeamId , TEAMS, Teams } from '../../../src/team/domain';
import { TeamBuilder } from '../builders/TeamBuilder';
import faker = require('faker');

describe('Delete team handler', () => {
  let command$: DeleteTeamHandler;
  const teams: Partial<Teams> = {};
  const teamId = TeamId.fromString(faker.datatype.uuid());
  const team = TeamBuilder.random();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteTeamHandler,
        {
          provide: TEAMS,
          useValue: teams,
        },
      ],
    }).compile();

    command$ = module.get<DeleteTeamHandler>(DeleteTeamHandler);
    teams.find = jest.fn().mockResolvedValue(null);
    teams.save = jest.fn();
  });

  it('should delete a team with the provided command', async () => {
    teams.find = jest.fn().mockResolvedValue(team);

    await command$.execute(new DeleteTeamCommand(teamId.value));

    expect(teams.save).toHaveBeenCalledTimes(1);
    expect(teams.save).toHaveBeenCalledWith(team);
  });

  it('should not delete a team if there is no competition with the provided id', async () => {
    await expect(() =>
      command$.execute(new DeleteTeamCommand(team.id.value))
    ).rejects.toThrow();

    expect(teams.save).not.toBeCalled();
  });
});
