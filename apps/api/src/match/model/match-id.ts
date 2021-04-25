import { Id } from '@opentour/domain';
import * as uuid from 'uuid';

export class MatchId extends Id {
  static generate(): MatchId {
    return new MatchId(uuid.v4());
  }

  public static fromString(id: string): MatchId {
    return new MatchId(id);
  }
}
