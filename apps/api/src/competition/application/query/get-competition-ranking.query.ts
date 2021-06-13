import { IQuery } from '@nestjs/cqrs';

export class GetCompetitionRankingQuery implements IQuery {
  constructor(readonly id: string) {}
}
