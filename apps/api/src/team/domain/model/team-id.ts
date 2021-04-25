import { Id } from '@opentour/domain';
import * as uuid from 'uuid';

export class TeamId extends Id {
  static generate(): TeamId {
    return new TeamId(uuid.v4());
  }

  public static fromString(id: string): TeamId {
    return new TeamId(id);
  }
}
