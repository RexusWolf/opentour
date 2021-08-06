import { Inject } from '@nestjs/common';
import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';

import { SendEmailCommand } from '../../../shared/emails/commands/send-email.command';
import EmailAddress from '../../../shared/emails/EmailAddress';
import { MatchResultWasModifiedEmail } from '../../../shared/emails/templates/MatchResultWasModifiedEmail';
import { TeamView } from '../../../team/infrastructure/read-model/schema/team.schema';
import { User, UserId, USERS, Users } from '../../../user/domain';
import { MatchResultWasModified } from '../../domain';

@EventsHandler(MatchResultWasModified)
export class SendEmailOnMatchResultWasModifiedSaga
  implements IEventHandler<MatchResultWasModified>
{
  constructor(
    private readonly commandBus: CommandBus,
    @Inject('TEAM_MODEL')
    private readonly teamModel: Model<TeamView>,
    @Inject(USERS) private userRepository: Users
  ) {}

  async handle(event: MatchResultWasModified) {
    const localTeam = await this.teamModel.findById(event.localTeam.id).exec();
    const visitorTeam = await this.teamModel
      .findById(event.visitorTeam.id)
      .exec();

    const recipientsEmails = await this.getCaptainsEmails(
      localTeam!,
      visitorTeam!
    );

    const competitionUrl = `${process.env.NODE_API_URL!}/competition/${
      event.competitionId
    }`;

    const email = new MatchResultWasModifiedEmail({
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
