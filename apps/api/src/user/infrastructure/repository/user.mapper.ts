import { Injectable } from '@nestjs/common';
import { UserDTO } from '@opentour/contracts';

import { EmailAddress, Role, User, UserId } from '../../domain';
import { UserDocument, UserSchema } from './user.model';

@Injectable()
export class UserMapper {
  documentToAggregate(userDocument: UserDocument): User {
    const { _id, email, roles } = userDocument;

    const user: User = Reflect.construct(User, []);
    Reflect.set(user, '_userId', UserId.fromString(_id));
    Reflect.set(user, '_email', EmailAddress.fromString(email));
    Reflect.set(
      user,
      '_roles',
      roles.map((role: string) => Role.fromString(role))
    );

    return user;
  }

  aggregateToDocument(user: User): UserDocument {
    return {
      _id: user.id.value,
      email: user.email.value,
      roles: user.roles.map((role: Role) => role.value),
    };
  }

  aggregateToDTO(user: User): UserDTO {
    return {
      id: user.id.value,
      email: user.email.value,
      roles: user.roles.map((role: Role) => role.value),
    };
  }
}
