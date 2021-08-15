import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand {
  readonly userId: string;
  readonly email: string;
  readonly roles: string[];
  constructor(params: { userId: string; email: string; roles: string[] }) {
    this.userId = params.userId;
    this.email = params.email;
    this.roles = params.roles;
  }
}
