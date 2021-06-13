import { IQuery } from '@nestjs/cqrs';

export class GetUserByUsernameQuery implements IQuery {
  constructor(readonly username: string) {}
}
