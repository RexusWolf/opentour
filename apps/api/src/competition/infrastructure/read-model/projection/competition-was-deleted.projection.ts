import { Inject } from '@nestjs/common';
import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { CompetitionWasDeleted } from '../../../domain/event';
import { CompetitionView } from '../schema/competition.schema';

@ViewUpdaterHandler(CompetitionWasDeleted)
export class CompetitionWasDeletedProjection
  implements IViewUpdater<CompetitionWasDeleted> {
  constructor(
    @Inject('COMPETITION_MODEL')
    private readonly competitionModel: Model<CompetitionView>
  ) {}

  async handle(event: CompetitionWasDeleted) {
    await this.competitionModel
      .updateOne({ _id: event.id }, { $set: { deleted: new Date() } })
      .exec();
  }
}
