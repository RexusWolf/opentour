import { Inject } from '@nestjs/common';
import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { CompetitionWasStarted } from '../../../domain/event/competition-was-started.event';
import { CompetitionView } from '../schema/competition.schema';

@ViewUpdaterHandler(CompetitionWasStarted)
export class CompetitionWasStartedProjection
  implements IViewUpdater<CompetitionWasStarted> {
  constructor(
    @Inject('COMPETITION_MODEL')
    private readonly competitionModel: Model<CompetitionView>
  ) {}

  async handle(event: CompetitionWasStarted) {
    await this.competitionModel
      .updateOne({ _id: event.id }, { $set: { hasStarted: true } })
      .exec();
  }
}
