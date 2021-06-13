import { ICommand } from '@nestjs/cqrs';

import { MatchResult } from '../../domain/model';

export class UpdateMatchCommand implements ICommand {
  readonly id: string;
  readonly date: Date;
  readonly result: MatchResult;

  constructor(params: { id: string; date: Date; result: MatchResult }) {
    this.id = params.id;
    this.date = params.date;
    this.result = params.result;
  }
}
