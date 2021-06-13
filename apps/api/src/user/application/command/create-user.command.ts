import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand {
  constructor(
    readonly userId: string,
    readonly username: string,
    readonly password: string,
    readonly roles: string[]
  ) {}
}
