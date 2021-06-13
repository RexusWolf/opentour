import { IQuery } from '@nestjs/cqrs';

export class GetUserQuery implements IQuery {
  constructor(readonly id: string) {}
}
