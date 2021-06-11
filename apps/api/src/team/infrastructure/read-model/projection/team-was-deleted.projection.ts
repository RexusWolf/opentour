import { Inject } from '@nestjs/common';
import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { TeamWasDeleted } from '../../../domain/event';
import { TeamView } from '../schema/team.schema';

@ViewUpdaterHandler(TeamWasDeleted)
export class TeamWasDeletedProjection implements IViewUpdater<TeamWasDeleted> {
  constructor(
    @Inject('TEAM_MODEL')
    private readonly teamModel: Model<TeamView>
  ) {}

  async handle(event: TeamWasDeleted) {
    await this.teamModel
      .updateOne({ _id: event.id }, { $set: { deleted: new Date() } })
      .exec();
  }
}
