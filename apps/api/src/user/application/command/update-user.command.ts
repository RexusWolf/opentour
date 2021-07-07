import { ICommand } from '@nestjs/cqrs';

export class UpdateUserCommand implements ICommand {
  constructor(
    readonly userId: string,
    readonly email: string,
    readonly password: string | null,
    readonly roles: string[]
  ) {}
}
