import { Inject } from '@nestjs/common';
import { IViewUpdater } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { CompetitionWasDeleted } from '../../../domain/event';
import { CompetitionView } from '../schema/competition.schema';

export class CompetitionWasDeletedProjection
  implements IViewUpdater<CompetitionWasDeleted> {
  constructor(
    @Inject('COMPETITION_MODEL')
    private readonly competitionModel: Model<CompetitionView>
  ) {}

  async handle(event: CompetitionWasDeleted) {
    const competitionView = new this.competitionModel({
      _id: event.id,
    });

    await competitionView.save();
  }
}
