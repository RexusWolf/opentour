import { Inject } from '@nestjs/common';
import { EventsHandler } from '@nestjs/cqrs';
import { IViewUpdater } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { CompetitionNextRoundWasStarted } from '../../../domain/event/competition-next-round-was-started.event';
import { CompetitionView } from '../schema/competition.schema';

@EventsHandler(CompetitionNextRoundWasStarted)
export class CompetitionNextRoundWasStartedProjection
  implements IViewUpdater<CompetitionNextRoundWasStarted>
{
  constructor(
    @Inject('COMPETITION_MODEL')
    private readonly competitionModel: Model<CompetitionView>
  ) {}

  async handle(event: CompetitionNextRoundWasStarted) {
    const nextJourney = event.nextJourney;
    await this.competitionModel
      .updateOne(
        { _id: event.id },
        { $set: { hasStarted: true, currentJourney: nextJourney } }
      )
      .exec();
  }
}
