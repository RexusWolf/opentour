import { Test, TestingModule } from '@nestjs/testing';

import {
  UpdateTeamCommand,
  UpdateTeamHandler,
} from '../../../src/team/application';
import { TEAMS, Teams } from '../../../src/team/domain/repository';
import { TeamBuilder } from '../builders/TeamBuilder';
import faker = require('faker');

describe.skip('Update team handler', () => {
  let command$: UpdateTeamHandler;
  const teams: Partial<Teams> = {};

  const team = new TeamBuilder().build();

  const teamId = faker.datatype.uuid();
  const name = faker.name.title();
  const membersIds = [faker.datatype.uuid()];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateTeamHandler,
        {
          provide: TEAMS,
          useValue: teams,
        },
      ],
    }).compile();

    command$ = module.get<UpdateTeamHandler>(UpdateTeamHandler);
    teams.find = jest.fn().mockResolvedValue(null);
    teams.save = jest.fn();
  });

  it('should update the found team for the given id', async () => {
    teams.find = jest.fn().mockResolvedValue(team);

    await command$.execute(new UpdateTeamCommand({ teamId, name, membersIds }));

    expect(teams.save).toHaveBeenCalledTimes(1);
  });
  it('should not update the team if it is not found', async () => {
    await expect(() =>
      command$.execute(new UpdateTeamCommand({ teamId, name, membersIds }))
    ).rejects.toThrow();

    expect(teams.save).not.toHaveBeenCalled();
  });
});
