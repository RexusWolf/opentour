import { Test, TestingModule } from '@nestjs/testing';

import {
  CreateTeamCommand,
  CreateTeamHandler,
} from '../../../src/team/application';
import { TEAMS, Teams } from '../../../src/team/domain';
import { TeamBuilder } from '../builders/TeamBuilder';

describe('Create team handler', () => {
  let command$: CreateTeamHandler;
  const teams: Partial<Teams> = {};

  const team = TeamBuilder.random();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTeamHandler,
        {
          provide: TEAMS,
          useValue: teams,
        },
      ],
    }).compile();

    command$ = module.get<CreateTeamHandler>(CreateTeamHandler);
    teams.find = jest.fn().mockResolvedValue(null);
    teams.save = jest.fn();
  });

  it('should create a new team', async () => {
    await command$.execute(
      new CreateTeamCommand(
        {
          id: team.id.value,
          competitionId: team.competitionId.value,
          logo: team.logo.value,
          name: team.name.value,
        },
        team.captainId.value
      )
    );

    expect(teams.save).toHaveBeenCalledTimes(1);
  });
  it('should not create a team if there is an existing team with same id', async () => {
    teams.find = jest.fn().mockResolvedValue(team);

    await expect(() =>
      command$.execute(
        new CreateTeamCommand(
          {
            id: team.id.value,
            competitionId: team.competitionId.value,
            logo: team.logo.value,
            name: team.name.value,
          },
          team.captainId.value
        )
      )
    ).rejects.toThrow();

    expect(teams.save).not.toHaveBeenCalled();
  });
});
