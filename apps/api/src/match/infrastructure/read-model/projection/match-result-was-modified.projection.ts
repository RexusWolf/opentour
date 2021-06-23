import { Inject } from '@nestjs/common';
import { EventsHandler } from '@nestjs/cqrs';
import { IViewUpdater } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { MatchResultWasModified } from '../../../domain';
import { MatchView } from '../schema/match.schema';

@EventsHandler(MatchResultWasModified)
export class MatchResultWasModifiedProjection
  implements IViewUpdater<MatchResultWasModified> {
  constructor(
    @Inject('MATCH_MODEL')
    private readonly matchModel: Model<MatchView>
  ) {}

  async handle(event: MatchResultWasModified) {
    await this.matchModel
      .updateOne(
        { _id: event.id },
        {
          'localTeam.score': event.localTeam.score,
          'visitorTeam.score': event.visitorTeam.score,
        }
      )
      .exec();
  }
}
