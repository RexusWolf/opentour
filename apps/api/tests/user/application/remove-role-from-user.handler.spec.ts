import { Test, TestingModule } from '@nestjs/testing';

import faker = require('faker');
import { USERS, Users } from '../../../src/user/domain';
import {
  RemoveRoleFromUserCommand,
  RemoveRoleFromUserHandler,
} from '../../../src/user/application';
import { Role } from '@opentour/contracts';
import { UserBuilder } from '../builders/UserBuilder';
import { UserMapper } from '../../../src/user/infrastructure/repository/user.mapper';

describe('Remove role user handler', () => {
  let command$: RemoveRoleFromUserHandler;
  const users: Partial<Users> = {};
  const userMapper: UserMapper = new UserMapper();

  const user = UserBuilder.random();

  const userId = faker.datatype.uuid();
  const role = Role.Admin;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoveRoleFromUserHandler,
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

    command$ = module.get<RemoveRoleFromUserHandler>(RemoveRoleFromUserHandler);
    users.find = jest.fn().mockResolvedValue(null);
    users.save = jest.fn();
  });

  it('should remove the role from the found user for the given id', async () => {
    users.find = jest.fn().mockResolvedValue(user);

    await command$.execute(new RemoveRoleFromUserCommand(userId, role));

    expect(users.save).toHaveBeenCalledTimes(1);
  });
  it('should not remove the role from the user if it is not found', async () => {
    await expect(() =>
      command$.execute(new RemoveRoleFromUserCommand(userId, role))
    ).rejects.toThrow();

    expect(users.save).not.toHaveBeenCalled();
  });
});
