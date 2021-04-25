import { IQuery } from '@nestjs/cqrs';

export class GetTeamByNameQuery implements IQuery {
  constructor(public readonly name: string) {}
}
