import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@opentour/contracts';

import {
  AddRoleToUserCommand,
  AddRoleToUserHandler,
} from '../../../src/user/application';
import { USERS, Users } from '../../../src/user/domain';
import { UserMapper } from '../../../src/user/infrastructure/repository/user.mapper';
import { UserBuilder } from '../builders/UserBuilder';

import faker = require('faker');

describe('Add role to user handler', () => {
  let command$: AddRoleToUserHandler;
  const users: Partial<Users> = {};
  const userMapper: UserMapper = new UserMapper();

  const user = UserBuilder.random();

  const userId = faker.datatype.uuid();
  const role = Role.Admin;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddRoleToUserHandler,
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

    command$ = module.get<AddRoleToUserHandler>(AddRoleToUserHandler);
    users.find = jest.fn().mockResolvedValue(null);
    users.save = jest.fn();
  });

  it('should add a role to the found user for the given id', async () => {
    users.find = jest.fn().mockResolvedValue(user);

    await command$.execute(new AddRoleToUserCommand(userId, role));

    expect(users.save).toHaveBeenCalledTimes(1);
  });
  it('should not add a role to the user if it is not found', async () => {
    await expect(() =>
      command$.execute(new AddRoleToUserCommand(userId, role))
    ).rejects.toThrow();

    expect(users.save).not.toHaveBeenCalled();
  });
});
