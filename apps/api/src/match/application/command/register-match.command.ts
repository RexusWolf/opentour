import { ICommand } from '@nestjs/cqrs';

export class RegisterMatchCommand implements ICommand {
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}
