import { Test } from '@nestjs/testing';
import * as uuid from 'uuid';

import { EmailAddress, Password, Role, User, UserId } from '../../domain';
import { UserMapper } from './user.mapper';

describe('User mapper', () => {
  let userMapper: UserMapper;
  const userId = UserId.fromString(uuid.v4());
  const email = EmailAddress.fromString('randomEmail@uco.es');
  const password = Password.fromString('password');
  const roleUser = Role.fromString('ROLE_USER');
  const roleAdmin = Role.fromString('ROLE_ADMIN');
  const roleAnonymous = Role.fromString('ROLE_ANONYMOUS');

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [UserMapper],
    }).compile();

    userMapper = app.get<UserMapper>(UserMapper);
  });

  it('converts from entity to aggregate', () => {
    const aggregate = userMapper.documentToAggregate({
      _id: userId.value,
      email: email.value,
      password: password.value,
      roles: [roleUser.value, roleAdmin.value],
    });

    expect(aggregate.id.equals(userId)).toBeTruthy();
    expect(aggregate.email.equals(email)).toBeTruthy();
    expect(aggregate.password.equals(password)).toBeTruthy();
    expect(aggregate.hasRole(roleUser)).toBeTruthy();
    expect(aggregate.hasRole(roleAdmin)).toBeTruthy();
    expect(aggregate.hasRole(roleAnonymous)).toBeFalsy();
  });

  it('converts from aggregate to entity', () => {
    const user = User.add(userId, email, password);
    user.addRole(roleUser);
    user.addRole(roleAdmin);

    const entity = userMapper.aggregateToDocument(user);

    expect(entity._id).toEqual(userId.value);
    expect(entity.email).toEqual(email.value);
    expect(entity.password).toEqual(password.value);
    expect(entity.roles).toEqual(
      expect.arrayContaining([roleUser.value, roleAdmin.value])
    );
    expect(entity.roles).not.toEqual(
      expect.arrayContaining([roleAnonymous.value])
    );
  });
});
