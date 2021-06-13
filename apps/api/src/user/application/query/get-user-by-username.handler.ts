import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserDTO } from '@opentour/contracts';

import { USERS, Users } from '../../domain';
import { Username } from '../../domain/username';
import { UserMapper } from '../../infrastructure/repository/user.mapper';
import { GetUserByUsernameQuery } from './get-user-by-username.query';

@QueryHandler(GetUserByUsernameQuery)
export class GetUserByUsernameHandler
  implements IQueryHandler<GetUserByUsernameQuery> {
  constructor(
    @Inject(USERS) private users: Users,
    private userMapper: UserMapper
  ) {}

  async execute(query: GetUserByUsernameQuery): Promise<UserDTO | null> {
    const user = await this.users.findOneByUsername(
      Username.fromString(query.username)
    );

    if (!user) {
      return null;
    }

    return this.userMapper.aggregateToEntity(user);
  }
}
