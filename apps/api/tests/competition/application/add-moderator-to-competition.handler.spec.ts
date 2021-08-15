import { Test, TestingModule } from '@nestjs/testing';

import {
  AddModeratorToCompetitionCommand,
  AddModeratorToCompetitionHandler,
} from '../../../src/competition/application';
import { COMPETITIONS, Competitions } from '../../../src/competition/domain';
import { USERS,Users } from '../../../src/user/domain';
import { UserBuilder } from '../../user/builders/UserBuilder';
import { CompetitionBuilder } from '../builders/CompetitionBuilder';

describe('Add moderator to competition handler', () => {
  let command$: AddModeratorToCompetitionHandler;
  const competitions: Partial<Competitions> = {};
  const users: Partial<Users> = {};

  const competition = CompetitionBuilder.random();
  const user = UserBuilder.random();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddModeratorToCompetitionHandler,
        {
          provide: COMPETITIONS,
          useValue: competitions,
        },
        {
          provide: USERS,
          useValue: users,
        },
      ],
    }).compile();

    command$ = module.get<AddModeratorToCompetitionHandler>(
      AddModeratorToCompetitionHandler
    );
    competitions.find = jest.fn().mockResolvedValue(null);
    users.findOneByEmail = jest.fn().mockResolvedValue(null);
    competitions.save = jest.fn();
  });

  it('should add the moderator to the found competition for the given id', async () => {
    competitions.find = jest.fn().mockResolvedValue(competition);
    users.findOneByEmail = jest.fn().mockResolvedValue(user);

    await command$.execute(
      new AddModeratorToCompetitionCommand(
        competition.id.value,
        user.email.value
      )
    );

    expect(competitions.save).toHaveBeenCalledWith(competition);
    expect(competitions.save).toHaveBeenCalledTimes(1);
  });
  it('should not add the moderator to the competition if it is not found', async () => {
    await expect(() =>
      command$.execute(
        new AddModeratorToCompetitionCommand(
          competition.id.value,
          user.email.value
        )
      )
    ).rejects.toThrow();

    expect(competitions.save).not.toHaveBeenCalled();
  });

  it('should not add the moderator to the competition if the user is not found', async () => {
    competitions.find = jest.fn().mockResolvedValue(competition);
    await expect(() =>
      command$.execute(
        new AddModeratorToCompetitionCommand(
          competition.id.value,
          user.email.value
        )
      )
    ).rejects.toThrow();

    expect(competitions.save).not.toHaveBeenCalled();
  });
});
