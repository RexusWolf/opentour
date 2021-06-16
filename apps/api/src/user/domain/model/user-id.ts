import { Id } from '@opentour/domain';
import { v4 as uuid } from 'uuid';

export class UserId extends Id {
  static generate(): UserId {
    return new UserId(uuid());
  }

  public static fromString(id: string): UserId {
    return new UserId(id);
  }
}
