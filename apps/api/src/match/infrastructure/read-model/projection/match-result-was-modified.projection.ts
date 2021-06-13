import { Inject } from '@nestjs/common';
import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { MatchResultWasModified } from '../../../domain/event/match-result-was-modified';
import { MatchView } from '../schema/match.schema';

@ViewUpdaterHandler(MatchResultWasModified)
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
          'localTeam.score': event.result.localTeamScore,
          'visitorTeam.score': event.result.visitorTeamScore,
        }
      )
      .exec();
  }
}
