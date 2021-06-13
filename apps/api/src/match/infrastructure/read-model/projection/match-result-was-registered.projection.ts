import { Inject } from '@nestjs/common';
import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { MatchWasRegistered } from '../../../domain';
import { MatchView } from '../schema/match.schema';

@ViewUpdaterHandler(MatchWasRegistered)
export class MatchResultWasRegisteredProjection
  implements IViewUpdater<MatchWasRegistered> {
  constructor(
    @Inject('MATCH_MODEL')
    private readonly matchModel: Model<MatchView>
  ) {}

  async handle(event: MatchWasRegistered) {
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
