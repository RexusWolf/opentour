import { Inject } from '@nestjs/common';
import { EventsHandler } from '@nestjs/cqrs';
import { IViewUpdater } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { CompetitionWasStarted } from '../../../domain';
import { CompetitionView } from '../schema/competition.schema';

@EventsHandler(CompetitionWasStarted)
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
