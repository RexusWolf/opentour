import { ICommand } from '@nestjs/cqrs';

export class CreateMatchCommand implements ICommand {
  readonly id: string;
  readonly competitionId: string;
  readonly index: number;
  readonly journey: string;

  constructor(params: {
    id: string;
    competitionId: string;
    index: number;
    journey: string;
  }) {
    this.id = params.id;
    this.competitionId = params.competitionId;
    this.index = params.index;
    this.journey = params.journey;
  }
}
