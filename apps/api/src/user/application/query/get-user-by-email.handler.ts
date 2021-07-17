import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserDTO } from '@opentour/contracts';

import { EmailAddress, USERS, Users } from '../../domain';
import { UserMapper } from '../../infrastructure/repository/user.mapper';
import { GetUserByEmailQuery } from './get-user-by-email.query';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
  constructor(
    @Inject(USERS) private users: Users,
    private userMapper: UserMapper
  ) {}

  async execute(query: GetUserByEmailQuery): Promise<UserDTO | null> {
    const user = await this.users.findOneByEmail(
      EmailAddress.fromString(query.email)
    );

    if (!user) {
      return null;
    }

    return this.userMapper.aggregateToEntity(user);
  }
}
