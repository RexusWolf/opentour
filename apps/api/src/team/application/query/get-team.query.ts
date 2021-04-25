import { IQuery } from '@nestjs/cqrs';

export class GetTeamQuery implements IQuery {
  constructor(public readonly id: string) {}
}
