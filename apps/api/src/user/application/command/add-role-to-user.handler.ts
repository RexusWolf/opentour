import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Role, UserId, UserIdNotFoundError, USERS, Users } from '../../domain';
import { UserMapper } from '../../infrastructure/repository/user.mapper';
import { AddRoleToUserCommand } from './add-role-to-user.command';

@CommandHandler(AddRoleToUserCommand)
export class AddRoleToUserHandler
  implements ICommandHandler<AddRoleToUserCommand>
{
  constructor(
    @Inject(USERS) private users: Users,
    private userMapper: UserMapper
  ) {}

  async execute(command: AddRoleToUserCommand) {
    const userId = UserId.fromString(command.userId);

    const user = await this.users.find(userId);
    if (!user) {
      throw UserIdNotFoundError.with(userId);
    }

    user.addRole(Role.fromString(command.role));

    this.users.save(user);

    return this.userMapper.aggregateToDocument(user);
  }
}
