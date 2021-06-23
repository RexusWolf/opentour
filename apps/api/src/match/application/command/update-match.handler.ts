import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  MATCHES,
  Matches,
  MatchId,
  MatchIdNotFoundError,
  MatchResult,
} from '../../domain';
import { UpdateMatchCommand } from './update-match.command';

@CommandHandler(UpdateMatchCommand)
export class UpdateMatchHandler implements ICommandHandler<UpdateMatchCommand> {
  constructor(@Inject(MATCHES) private matches: Matches) {}

  async execute(command: UpdateMatchCommand) {
    const id = MatchId.fromString(command.id);
    const result = MatchResult.fromTeamScore(
      command.result.localTeamScore,
      command.result.visitorTeamScore
    );

    const match = await this.matches.find(id);
    if (!match) {
      throw MatchIdNotFoundError.with(id);
    }

    match.schedule(command.date);

    match.modifyMatchResult(result);

    this.matches.save(match);
  }
}
