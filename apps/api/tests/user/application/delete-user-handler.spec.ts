import { Test, TestingModule } from '@nestjs/testing';

import {
  DeleteUserCommand,
  DeleteUserHandler,
} from '../../../src/user/application';
import { UserId, USERS,Users } from '../../../src/user/domain';
import { UserMapper } from '../../../src/user/infrastructure/repository/user.mapper';
import { UserBuilder } from '../builders/UserBuilder';
import faker = require('faker');

describe('Delete team handler', () => {
  let command$: DeleteUserHandler;
  const users: Partial<Users> = {};
  const userMapper: UserMapper = new UserMapper();
  const userId = UserId.fromString(faker.datatype.uuid());
  const team = UserBuilder.random();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserHandler,
        {
          provide: USERS,
          useValue: users,
        },
        {
          provide: UserMapper,
          useValue: userMapper,
        },
      ],
    }).compile();

    command$ = module.get<DeleteUserHandler>(DeleteUserHandler);
    users.find = jest.fn().mockResolvedValue(null);
    users.save = jest.fn();
  });

  it('should delete a team with the provided command', async () => {
    users.find = jest.fn().mockResolvedValue(team);

    await command$.execute(new DeleteUserCommand(userId.value));

    expect(users.save).toHaveBeenCalledTimes(1);
    expect(users.save).toHaveBeenCalledWith(team);
  });

  it('should not delete a team if there is no competition with the provided id', async () => {
    await expect(() =>
      command$.execute(new DeleteUserCommand(team.id.value))
    ).rejects.toThrow();

    expect(users.save).not.toBeCalled();
  });
});
