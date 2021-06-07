import { Inject } from '@nestjs/common';
import { IViewUpdater } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { CompetitionWasUpdated } from '../../../domain/event/competition-was-updated.event';
import { CompetitionView } from '../schema/competition.schema';

export class CompetitionWasUpdatedProjection
  implements IViewUpdater<CompetitionWasUpdated> {
  constructor(
    @Inject('COMPETITION_MODEL')
    private readonly competitionModel: Model<CompetitionView>
  ) {}

  async handle(event: CompetitionWasUpdated) {
    const competitionView = new this.competitionModel({
      _id: event.id,
      name: event.name,
      moderatorIds: event.moderatorIds,
    });

    await competitionView.save();
  }
}
