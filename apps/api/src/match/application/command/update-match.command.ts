import { ICommand } from '@nestjs/cqrs';

import { MatchResult } from '../../domain/model';

export class UpdateMatchCommand implements ICommand {
  constructor(
    public readonly matchId: string,
    public readonly localTeamId: string,
    public readonly visitorTeamId: string,
    public readonly date: Date,
    public readonly result: MatchResult
  ) {}
}
