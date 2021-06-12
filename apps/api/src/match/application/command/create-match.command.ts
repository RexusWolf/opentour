import { ICommand } from '@nestjs/cqrs';

export class CreateMatchCommand implements ICommand {
  readonly id: string;
  readonly competitionId: string;
  readonly localTeamId: string;
  readonly visitorTeamId: string;
  readonly index: number;
  readonly journey: string;

  constructor(params: {
    id: string;
    competitionId: string;
    localTeamId: string;
    visitorTeamId: string;
    index: number;
    journey: string;
  }) {
    this.id = params.id;
    this.competitionId = params.competitionId;
    this.localTeamId = params.localTeamId;
    this.visitorTeamId = params.visitorTeamId;
    this.index = params.index;
    this.journey = params.journey;
  }
}
