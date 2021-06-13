import { IQuery } from '@nestjs/cqrs';

export class GetMatchQuery implements IQuery {
  constructor(readonly id: string) {}
}
