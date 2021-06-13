import { Inject } from '@nestjs/common';
import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { CompetitionWasCreated } from '../../../domain';
import { CompetitionView } from '../schema/competition.schema';

@ViewUpdaterHandler(CompetitionWasCreated)
export class CompetitionWasCreatedProjection
  implements IViewUpdater<CompetitionWasCreated> {
  constructor(
    @Inject('COMPETITION_MODEL')
    private readonly competitionModel: Model<CompetitionView>
  ) {}

  async handle(event: CompetitionWasCreated) {
    const competitionView = new this.competitionModel({
      _id: event.id,
      name: event.name,
      type: event.type,
      sportName: event.sportName,
      moderatorIds: [event.moderatorId],
      hasStarted: false,
    });

    await competitionView.save();
  }
}
