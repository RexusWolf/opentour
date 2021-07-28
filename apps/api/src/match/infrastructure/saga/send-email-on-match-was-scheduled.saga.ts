import { Inject } from '@nestjs/common';
import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';

import { SendEmailCommand } from '../../../shared/emails/commands/send-email.command';
import EmailAddress from '../../../shared/emails/EmailAddress';
import { MatchWasScheduledEmail } from '../../../shared/emails/templates/MatchWasScheduledEmail';
import { TeamView } from '../../../team/infrastructure/read-model/schema/team.schema';
import { UserId, USERS,Users } from '../../../user/domain';
import { MatchWasScheduled } from '../../domain';
import { MatchView } from '../read-model/schema/match.schema';

@EventsHandler(MatchWasScheduled)
export class SendEmailOnMatchWasScheduledSaga
  implements IEventHandler<MatchWasScheduled>
{
  constructor(
    private readonly commandBus: CommandBus,
    @Inject('MATCH_MODEL')
    private readonly matchModel: Model<MatchView>,
    @Inject('TEAM_MODEL')
    private readonly teamModel: Model<TeamView>,
    @Inject(USERS) private userRepository: Users
  ) {}

  async handle(event: MatchWasScheduled) {
    const match = await this.matchModel.findById(event.id).exec();

    const localTeam = await this.teamModel
      .findOne({
        name: match!.localTeam.name,
        competitionId: match?.competitionId,
      })
      .exec();

    const visitorTeam = await this.teamModel
      .findOne({
        name: match!.visitorTeam.name,
        competitionId: match?.competitionId,
      })
      .exec();

    //const recipientsEmails = await this.getCaptainsEmails(localTeam!, visitorTeam!);

    const recipientsEmails = [
      EmailAddress.fromString(process.env.MAILER_USER!),
    ];

    const competitionUrl = `${process.env.NODE_API_URL!}/competition/${
      match!.competitionId
    }`;

    const email = new MatchWasScheduledEmail({
      recipientsEmails,
      competitionUrl,
    });

    this.commandBus.execute(new SendEmailCommand(email));
  }

  private async getCaptainsEmails(localTeam: TeamView, visitorTeam: TeamView) {
    const localTeamCaptain = await this.userRepository.find(
      UserId.fromString(localTeam.captainId)
    );
    const visitorTeamCaptain = await this.userRepository.find(
      UserId.fromString(visitorTeam.captainId)
    );

    return [localTeamCaptain!.email, visitorTeamCaptain!.email];
  }
}
