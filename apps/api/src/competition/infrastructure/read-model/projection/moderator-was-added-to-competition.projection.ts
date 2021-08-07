import { Inject } from '@nestjs/common';
import { EventsHandler } from '@nestjs/cqrs';
import { IViewUpdater } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { ModeratorWasAddedToCompetition } from '../../../domain';
import { CompetitionView } from '../schema/competition.schema';

@EventsHandler(ModeratorWasAddedToCompetition)
export class ModeratorWasAddedToCompetitionProjection
  implements IViewUpdater<ModeratorWasAddedToCompetition>
{
  constructor(
    @Inject('COMPETITION_MODEL')
    private readonly competitionModel: Model<CompetitionView>
  ) {}

  async handle(event: ModeratorWasAddedToCompetition) {
    await this.competitionModel
      .updateOne(
        { _id: event.id },
        { $addToSet: { moderatorIds: [event.userId] } }
      )
      .exec();
  }
}
