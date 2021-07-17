import { ICommand } from '@nestjs/cqrs';

import { Email } from '../Email';

export class SendEmailCommand implements ICommand {
  readonly email: Email;

  constructor(email: Email) {
    this.email = email;
  }
}
