import { IQuery } from '@nestjs/cqrs';

export class GetMatchesByCompetitionIdQuery implements IQuery {
  constructor(public readonly competitionId: string) {}
}
