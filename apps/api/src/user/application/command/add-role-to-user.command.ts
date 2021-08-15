import { ICommand } from '@nestjs/cqrs';

export class AddRoleToUserCommand implements ICommand {
  constructor(readonly userId: string, readonly role: string) {}
}
