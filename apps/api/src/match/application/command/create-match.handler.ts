import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CompetitionId } from '../../../competition/domain';
import { TeamId } from '../../../team/domain';
import {
  Match,
  MATCHES,
  Matches,
  MatchId,
 MatchIdAlreadyTakenError,  MatchIndex,
  MatchJourney } from '../../domain';
import { CreateMatchCommand } from './create-match.command';

@CommandHandler(CreateMatchCommand)
export class CreateMatchHandler implements ICommandHandler<CreateMatchCommand> {
  constructor(@Inject(MATCHES) private matches: Matches) {}

  async execute(command: CreateMatchCommand) {
    const id = MatchId.fromString(command.id);
    const competitionId = CompetitionId.fromString(command.competitionId);
    const localTeamId = TeamId.fromString(command.localTeamId);
    const visitorTeamId = TeamId.fromString(command.visitorTeamId);
    const index = MatchIndex.fromNumber(command.index);
    const journey = MatchJourney.fromString(command.journey);

    if (await this.matches.find(id)) {
      throw MatchIdAlreadyTakenError.with(id);
    }

    const match = Match.create({
      id,
      competitionId,
      localTeamId,
      visitorTeamId,
      index,
      journey,
    });

    this.matches.save(match);
  }
}
