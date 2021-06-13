import { ICommand } from '@nestjs/cqrs';
import { CreateMatchDTO } from '@opentour/contracts';

export class CreateMatchCommand implements ICommand {
  readonly id: string;
  readonly competitionId: string;
  readonly localTeamId: string;
  readonly visitorTeamId: string;
  readonly index: number;
  readonly journey: string;

  constructor(match: CreateMatchDTO) {
    this.id = match.id;
    this.competitionId = match.competitionId;
    this.localTeamId = match.localTeamId;
    this.visitorTeamId = match.visitorTeamId;
    this.index = match.index;
    this.journey = match.journey;
  }
}
