import { IQuery } from '@nestjs/cqrs';

export class GetTeamsByCompetitionIdQuery implements IQuery {
  constructor(public readonly competitionId: string) {}
}
