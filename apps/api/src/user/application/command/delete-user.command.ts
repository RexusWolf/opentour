import { ICommand } from '@nestjs/cqrs';

export class DeleteUserCommand implements ICommand {
  constructor(readonly userId: string) {}
}
