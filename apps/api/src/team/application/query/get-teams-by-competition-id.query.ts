import { IQuery } from '@nestjs/cqrs';

export class GetTeamsByCompetitionIdQuery implements IQuery {
  constructor(readonly competitionId: string) {}
}
