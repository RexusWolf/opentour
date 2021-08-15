import { Test, TestingModule } from '@nestjs/testing';

import {
  CreateUserCommand,
  CreateUserHandler,
} from '../../../src/user/application';
import { USERS, Users } from '../../../src/user/domain';
import { UserMapper } from '../../../src/user/infrastructure/repository/user.mapper';
import { UserBuilder } from '../builders/UserBuilder';

describe('Create user handler', () => {
  let command$: CreateUserHandler;
  const users: Partial<Users> = {};
  const userMapper: UserMapper = new UserMapper();

  const user = UserBuilder.random();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserHandler,
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

    command$ = module.get<CreateUserHandler>(CreateUserHandler);
    users.find = jest.fn().mockResolvedValue(null);
    users.findOneByEmail = jest.fn().mockResolvedValue(null);
    userMapper.aggregateToDocument = jest.fn().mockResolvedValue(null);
    users.save = jest.fn();
  });

  it('should create a new user', async () => {
    await command$.execute(
      new CreateUserCommand({
        userId: user.id.value,
        email: user.email.value,
        roles: user.roles.map((role) => role.value),
      })
    );

    expect(users.save).toHaveBeenCalledTimes(1);
  });
  it('should not create a user if there is an existing user with same id', async () => {
    users.find = jest.fn().mockResolvedValue(user);

    await expect(() =>
      command$.execute(
        new CreateUserCommand({
          userId: user.id.value,
          email: user.email.value,
          roles: user.roles.map((role) => role.value),
        })
      )
    ).rejects.toThrow();

    expect(users.save).not.toHaveBeenCalled();
  });
});
