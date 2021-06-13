import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { MATCHES, Matches, MatchId , MatchIdNotFoundError } from '../../domain';
import { UpdateMatchCommand } from './update-match.command';

@CommandHandler(UpdateMatchCommand)
export class UpdateMatchHandler implements ICommandHandler<UpdateMatchCommand> {
  constructor(@Inject(MATCHES) private matches: Matches) {}

  async execute(command: UpdateMatchCommand) {
    const id = MatchId.fromString(command.id);

    const match = await this.matches.find(id);
    if (!match) {
      throw MatchIdNotFoundError.with(id);
    }

    match.schedule(command.date);

    match.modifyResult(command.result);

    this.matches.save(match);
  }
}
