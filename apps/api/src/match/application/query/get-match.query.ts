import { IQuery } from '@nestjs/cqrs';

export class GetMatchQuery implements IQuery {
  constructor(public readonly id: string) {}
}
