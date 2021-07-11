import { Inject } from '@nestjs/common';
import { EventsHandler } from '@nestjs/cqrs';
import { IViewUpdater } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { TeamView } from '../../../../team/infrastructure/read-model/schema/team.schema';
import { MatchTeamsWereModified } from '../../../domain';
import { MatchView } from '../schema/match.schema';

@EventsHandler(MatchTeamsWereModified)
export class MatchTeamsWereModifiedProjection
  implements IViewUpdater<MatchTeamsWereModified>
{
  constructor(
    @Inject('MATCH_MODEL')
    private readonly matchModel: Model<MatchView>,

    @Inject('TEAM_MODEL')
    private readonly teamModel: Model<TeamView>
  ) {}

  async handle(event: MatchTeamsWereModified) {
    const localTeam = await this.teamModel.findById(event.localTeamId).exec();
    const visitorTeam = await this.teamModel
      .findById(event.visitorTeamId)
      .exec();

    await this.matchModel
      .updateOne(
        { _id: event.id },
        {
          'localTeam.name': localTeam && localTeam.name,
          'localTeam.logo': localTeam && localTeam.logo,
          'visitorTeam.name': visitorTeam && visitorTeam.name,
          'visitorTeam.logo': visitorTeam && visitorTeam.logo,
        }
      )
      .exec();
  }
}
