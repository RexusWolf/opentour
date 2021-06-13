import { IQuery } from '@nestjs/cqrs';

export class GetCompetitionQuery implements IQuery {
  constructor(readonly id: string) {}
}
