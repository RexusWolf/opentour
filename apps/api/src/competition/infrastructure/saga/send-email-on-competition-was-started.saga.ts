import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SendEmailCommand } from '../../../shared/emails/commands/send-email.command';
import { CompetitionWasStartedEmail } from '../../../shared/emails/CompetitionWasStartedEmail';
import EmailAddress from '../../../shared/emails/EmailAddress';
import { CompetitionWasStarted } from '../../domain';

@EventsHandler(CompetitionWasStarted)
export class SendEmailOnCompetitionWasStartedSaga
  implements IEventHandler<CompetitionWasStarted>
{
  constructor(private readonly commandBus: CommandBus) {}

  async handle(event: CompetitionWasStarted) {
    const recipientsEmails = [
      EmailAddress.fromString('francis.molina@audiense.com'),
    ];

    const email = new CompetitionWasStartedEmail({
      recipientsEmails,
    });

    await this.commandBus.execute(new SendEmailCommand(email));
  }
}
