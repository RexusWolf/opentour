import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TeamId } from '../../../team/domain';
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
    const result =
      command.result &&
      MatchResult.fromTeamScore(
        command.result.localTeamScore,
        command.result.visitorTeamScore
      );

    const match = await this.matches.find(id);
    if (!match) {
      throw MatchIdNotFoundError.with(id);
    }

    if (command.localTeamId || command.visitorTeamId) {
      if (command.localTeamId) {
        match.modifyMatchTeams(
          TeamId.fromString(command.localTeamId),
          match.visitorTeamId
        );
      }

      if (command.visitorTeamId) {
        match.modifyMatchTeams(
          match.localTeamId,
          TeamId.fromString(command.visitorTeamId)
        );
      }
    }

    if (result && match.isScheduled()) {
      match.modifyMatchResult(result);
    }

    if (command.date) {
      match.schedule(command.date);
    }

    this.matches.save(match);
  }
}
