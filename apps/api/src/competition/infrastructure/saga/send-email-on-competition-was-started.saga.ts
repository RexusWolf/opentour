import { Inject } from '@nestjs/common';
import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';

import { SendEmailCommand } from '../../../shared/emails/commands/send-email.command';
import EmailAddress from '../../../shared/emails/EmailAddress';
import { CompetitionWasStartedEmail } from '../../../shared/emails/templates/CompetitionWasStartedEmail';
import { TeamView } from '../../../team/infrastructure/read-model/schema/team.schema';
import { User, UserId, USERS,Users } from '../../../user/domain';
import { CompetitionWasStarted } from '../../domain';

@EventsHandler(CompetitionWasStarted)
export class SendEmailOnCompetitionWasStartedSaga
  implements IEventHandler<CompetitionWasStarted>
{
  constructor(
    private readonly commandBus: CommandBus,
    @Inject('TEAM_MODEL') private readonly teamModel: Model<TeamView>,
    @Inject(USERS) private userRepository: Users
  ) {}

  async handle(event: CompetitionWasStarted) {
    const teamsInCompetition = await this.teamModel
      .find({ competitionId: event.id })
      .exec();

    //const recipientsEmails = await this.getCaptainsEmails(teamsInCompetition);

    const recipientsEmails = [
      EmailAddress.fromString(process.env.MAILER_USER!),
    ];

    const competitionUrl = `${process.env.NODE_API_URL!}/competition/${
      event.id
    }`;

    const email = new CompetitionWasStartedEmail({
      recipientsEmails,
      competitionUrl,
    });

    await this.commandBus.execute(new SendEmailCommand(email));
  }

  private async getCaptainsEmails(teams: TeamView[]) {
    const teamsCaptainsIds = teams.map((team) => team.captainId);

    const teamsCaptains: User[] = [];

    for (const id of teamsCaptainsIds) {
      const captain = await this.userRepository.find(UserId.fromString(id));
      if (captain) {
        teamsCaptains.push(captain);
      }
    }

    const captainsEmails = teamsCaptains.map((captain) => captain.email);

    return captainsEmails;
  }
}
