import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand {
  constructor(
    readonly userId: string,
    readonly email: string,
    readonly password: string,
    readonly roles: string[]
  ) {}
}
