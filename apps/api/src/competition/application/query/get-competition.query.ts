import { IQuery } from '@nestjs/cqrs';

export class GetCompetitionQuery implements IQuery {
  constructor(public readonly id: string) {}
}
