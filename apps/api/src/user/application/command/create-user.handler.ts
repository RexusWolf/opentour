import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  Email,
  EmailAlreadyTakenError,
  Password,
  Role,
  User,
  UserId,
  UserIdAlreadyTakenError,
  USERS,
  Users,
} from '../../domain';
import { UserMapper } from '../../infrastructure/repository/user.mapper';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(USERS) private users: Users,
    private userMapper: UserMapper
  ) {}

  async execute(command: CreateUserCommand) {
    const userId = UserId.fromString(command.userId);
    const email = Email.fromString(command.email);
    const password = Password.fromString(command.password);

    if (await this.users.find(userId)) {
      throw UserIdAlreadyTakenError.with(userId);
    }

    if (await this.users.findOneByEmail(email)) {
      throw EmailAlreadyTakenError.with(email);
    }

    const user = User.add(userId, email, password);
    command.roles.map((role: string) => user.addRole(Role.fromString(role)));

    this.users.save(user);

    return this.userMapper.aggregateToEntity(user);
  }
}
