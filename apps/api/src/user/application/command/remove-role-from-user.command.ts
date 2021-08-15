import { ICommand } from '@nestjs/cqrs';

export class RemoveRoleFromUserCommand implements ICommand {
  constructor(readonly userId: string, readonly role: string) {}
}
