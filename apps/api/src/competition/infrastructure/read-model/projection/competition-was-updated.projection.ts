import { Inject } from '@nestjs/common';
import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { CompetitionWasUpdated } from '../../../domain/event/competition-was-updated.event';
import { CompetitionView } from '../schema/competition.schema';

@ViewUpdaterHandler(CompetitionWasUpdated)
export class CompetitionWasUpdatedProjection
  implements IViewUpdater<CompetitionWasUpdated> {
  constructor(
    @Inject('COMPETITION_MODEL')
    private readonly competitionModel: Model<CompetitionView>
  ) {}

  async handle(event: CompetitionWasUpdated) {
    console.log('UPDATING VIEW');
    await this.competitionModel
      .updateOne(
        { _id: event.id },
        { $set: { name: event.name, moderatorIds: event.moderatorIds } }
      )
      .exec();
  }
}
