import { Id } from '@opentour/domain';
import * as uuid from 'uuid';

export class SportId extends Id {
  static generate(): SportId {
    return new SportId(uuid.v4());
  }

  public static fromString(id: string): SportId {
    return new SportId(id);
  }
}
