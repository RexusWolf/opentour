import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { transporter } from '../../../config/mailerService';
import { SendEmailCommand } from './send-email.command';

@CommandHandler(SendEmailCommand)
export class SendEmailHandler implements ICommandHandler<SendEmailCommand> {
  async execute(command: SendEmailCommand) {
    const mail = {
      from: `${command.email.senderName} ${command.email.sender}`,
      to: command.email.recipients,
      subject: command.email.subject.value,
      html: command.email.body,
    };

    await transporter.sendMail(mail);
  }
}
