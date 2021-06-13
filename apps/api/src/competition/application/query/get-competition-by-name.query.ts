import { IQuery } from '@nestjs/cqrs';

export class GetCompetitionByNameQuery implements IQuery {
  constructor(readonly name: string) {}
}
