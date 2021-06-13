import { IQuery } from '@nestjs/cqrs';

export class GetMatchesByCompetitionIdQuery implements IQuery {
  constructor(readonly competitionId: string) {}
}
