import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { MATCHES, Matches, MatchId, MatchIdNotFoundError } from '../../domain';
import { RegisterMatchCommand } from './register-match.command';

@CommandHandler(RegisterMatchCommand)
export class RegisterMatchHandler
  implements ICommandHandler<RegisterMatchCommand> {
  constructor(@Inject(MATCHES) private matches: Matches) {}

  async execute(command: RegisterMatchCommand) {
    const id = MatchId.fromString(command.id);

    const match = await this.matches.find(id);
    if (!match) {
      throw MatchIdNotFoundError.with(id);
    }

    match.register();

    this.matches.save(match);
  }
}
