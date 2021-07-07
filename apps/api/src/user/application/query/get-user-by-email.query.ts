import { IQuery } from '@nestjs/cqrs';

export class GetUserByEmailQuery implements IQuery {
  constructor(readonly email: string) {}
}
