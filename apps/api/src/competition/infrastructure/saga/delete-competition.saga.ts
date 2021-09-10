import { Inject } from '@nestjs/common';
import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';
import { DeleteMatchCommand } from '../../../match/application';
import { MatchView } from '../../../match/infrastructure/read-model/schema/match.schema';
import { CompetitionWasDeleted } from '../../domain';

@EventsHandler(CompetitionWasDeleted)
export class CompetitionWasDeletedSaga
  implements IEventHandler<CompetitionWasDeleted>
{
  constructor(
    private readonly commandBus: CommandBus,
    @Inject('MATCH_MODEL') private readonly matchModel: Model<MatchView>
  ) {}

  async handle(event: CompetitionWasDeleted) {
    const matchsInCompetition = await this.matchModel
      .find({ competitionId: event.id })
      .exec();

    for (const match of matchsInCompetition) {
      await this.commandBus.execute(new DeleteMatchCommand(match.id));
    }
  }
}
