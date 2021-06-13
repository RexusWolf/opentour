import { IQuery } from '@nestjs/cqrs';

export class GetTeamQuery implements IQuery {
  constructor(readonly id: string) {}
}
