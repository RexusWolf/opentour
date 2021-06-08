import { Inject } from '@nestjs/common';
import { IViewUpdater } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { TeamWasCreated } from '../../../domain/event';
import { TeamView } from '../schema/team.schema';

export class TeamWasCreatedProjection implements IViewUpdater<TeamWasCreated> {
  constructor(
    @Inject('TEAM_MODEL')
    private readonly teamModel: Model<TeamView>
  ) {}

  async handle(event: TeamWasCreated) {
    const teamView = new this.teamModel({
      _id: event.id,
      name: event.name,
      type: event.captainId,
      competitionId: event.competitionId,
    });

    await teamView.save();
  }
}
