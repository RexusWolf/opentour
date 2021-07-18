import { Inject } from '@nestjs/common';
import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { Repository } from 'typeorm';

import { SendEmailCommand } from '../../../shared/emails/commands/send-email.command';
import EmailAddress from '../../../shared/emails/EmailAddress';
import { MatchResultWasModifiedEmail } from '../../../shared/emails/templates/MatchResultWasModifiedEmail';
import { TeamView } from '../../../team/infrastructure/read-model/schema/team.schema';
import { UserEntity } from '../../../user/infrastructure/entity/user.entity';
import { MatchResultWasModified } from '../../domain';

@EventsHandler(MatchResultWasModified)
export class SendEmailOnMatchResultWasModifiedSaga
  implements IEventHandler<MatchResultWasModified>
{
  constructor(
    private readonly commandBus: CommandBus,
    @Inject('MATCH_MODEL')
    private readonly teamModel: Model<TeamView>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) {}

  async handle(event: MatchResultWasModified) {
    const localTeam = await this.teamModel.findById(event.localTeam.id).exec();
    const visitorTeam = await this.teamModel
      .findById(event.visitorTeam.id)
      .exec();

    //const recipientsEmails = await this.getCaptainsEmails(localTeam!, visitorTeam!);

    const recipientsEmails = [
      EmailAddress.fromString(process.env.MAILER_USER!),
    ];

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
    const teamsCaptains = await this.userRepository.findByIds([
      localTeam?.captainId,
      visitorTeam?.captainId,
    ]);

    const captainsEmails = teamsCaptains.map((captain) =>
      EmailAddress.fromString(captain.email)
    );

    return captainsEmails;
  }
}
