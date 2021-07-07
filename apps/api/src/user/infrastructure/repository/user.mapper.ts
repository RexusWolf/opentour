import { Injectable } from '@nestjs/common';

import { Email,Password, Role, User, UserId } from '../../domain';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserMapper {
  entityToAggregate(userEntity: UserEntity): User {
    const { id, email, password, roles } = userEntity;

    const user: User = Reflect.construct(User, []);
    Reflect.set(user, '_userId', UserId.fromString(id));
    Reflect.set(user, '_email', Email.fromString(email));
    Reflect.set(user, '_password', Password.fromString(password));
    Reflect.set(
      user,
      '_roles',
      roles.map((role: string) => Role.fromString(role))
    );

    return user;
  }

  aggregateToEntity(user: User): UserEntity {
    return new UserEntity(
      user.id.value,
      user.email.value,
      user.password.value,
      user.roles.map((role: Role) => role.value)
    );
  }
}
