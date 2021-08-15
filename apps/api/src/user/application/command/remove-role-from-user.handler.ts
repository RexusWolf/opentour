import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Role, UserId, UserIdNotFoundError, USERS, Users } from '../../domain';
import { UserMapper } from '../../infrastructure/repository/user.mapper';
import { RemoveRoleFromUserCommand } from './remove-role-from-user.command';

@CommandHandler(RemoveRoleFromUserCommand)
export class RemoveRoleFromUserHandler
  implements ICommandHandler<RemoveRoleFromUserCommand>
{
  constructor(
    @Inject(USERS) private users: Users,
    private userMapper: UserMapper
  ) {}

  async execute(command: RemoveRoleFromUserCommand) {
    const userId = UserId.fromString(command.userId);

    const user = await this.users.find(userId);
    if (!user) {
      throw UserIdNotFoundError.with(userId);
    }

    user.removeRole(Role.fromString(command.role));

    this.users.save(user);

    return this.userMapper.aggregateToDocument(user);
  }
}
