import { Inject } from '@nestjs/common';
import { IViewUpdater } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { TeamWasDeleted } from '../../../domain/event';
import { TeamView } from '../schema/team.schema';

export class TeamWasDeletedProjection implements IViewUpdater<TeamWasDeleted> {
  constructor(
    @Inject('TEAM_MODEL')
    private readonly teamModel: Model<TeamView>
  ) {}

  async handle(event: TeamWasDeleted) {
    const teamView = new this.teamModel({
      _id: event.id,
    });

    await teamView.save();
  }
}
