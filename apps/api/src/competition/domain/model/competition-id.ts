import { Id } from '@opentour/domain';
import { v4 as uuid } from 'uuid';

export class CompetitionId extends Id {
  static generate(): CompetitionId {
    return new CompetitionId(uuid());
  }

  public static fromString(id: string): CompetitionId {
    return new CompetitionId(id);
  }
}
