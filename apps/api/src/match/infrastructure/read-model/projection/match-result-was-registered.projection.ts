import { Inject } from '@nestjs/common';
import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { MatchWasFinished } from '../../../domain/event/match-was-finished';
import { MatchView } from '../schema/match.schema';

@ViewUpdaterHandler(MatchWasFinished)
export class MatchResultWasRegisteredProjection
  implements IViewUpdater<MatchWasFinished> {
  constructor(
    @Inject('MATCH_MODEL')
    private readonly matchModel: Model<MatchView>
  ) {}

  async handle(event: MatchWasFinished) {
    await this.matchModel
      .updateOne(
        { _id: event.id },
        {
          finished: new Date(),
        }
      )
      .exec();
  }
}
