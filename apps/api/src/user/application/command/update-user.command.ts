import { ICommand } from '@nestjs/cqrs';

export class UpdateUserCommand implements ICommand {
  constructor(
    readonly userId: string,
    readonly username: string,
    readonly password: string | null,
    readonly roles: string[]
  ) {}
}
