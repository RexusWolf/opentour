import { IQuery } from '@nestjs/cqrs';

export class GetCompetitionByNameQuery implements IQuery {
  constructor(public readonly name: string) {}
}
