import { ICommand } from '@nestjs/cqrs';

import { MatchResult } from '../../domain/model';

export class UpdateMatchCommand implements ICommand {
  readonly id: string;
  readonly localTeamId: string;
  readonly visitorTeamId: string;
  readonly date: Date;
  readonly result: MatchResult;

  constructor(params: {
    id: string;
    localTeamId: string;
    visitorTeamId: string;
    date: Date;
    result: MatchResult;
  }) {
    this.id = params.id;
    this.localTeamId = params.localTeamId;
    this.visitorTeamId = params.visitorTeamId;
    this.date = params.date;
    this.result = params.result;
  }
}
