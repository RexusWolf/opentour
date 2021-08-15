import { Inject } from '@nestjs/common';
import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { TeamWasCreated } from '../../../domain';
import { TeamView } from '../schema/team.schema';

@ViewUpdaterHandler(TeamWasCreated)
export class TeamWasCreatedProjection implements IViewUpdater<TeamWasCreated> {
  constructor(
    @Inject('TEAM_MODEL')
    private readonly teamModel: Model<TeamView>
  ) {}

  async handle(event: TeamWasCreated) {
    const teamView = new this.teamModel({
      _id: event.id,
      competitionId: event.competitionId,
      name: event.name,
      captainId: event.captainId,
      logo: event.logo,
      deleted: null,
    });

    await teamView.save();
  }
}
