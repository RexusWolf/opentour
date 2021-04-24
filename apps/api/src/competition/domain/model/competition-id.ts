import { Id } from '@opentour/domain';
import * as uuid from 'uuid';

export class CompetitionId extends Id {
  static generate(): CompetitionId {
    return new CompetitionId(uuid.v4());
  }

  public static fromString(id: string): CompetitionId {
    return new CompetitionId(id);
  }
}
