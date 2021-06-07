import { Inject } from '@nestjs/common';
import { IViewUpdater } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { CompetitionWasCreated } from '../../../domain/event';
import { CompetitionView } from '../schema/competition.schema';

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
      sportId: event.sportId,
      moderatorId: event.moderatorId,
    });

    await competitionView.save();
  }
}
