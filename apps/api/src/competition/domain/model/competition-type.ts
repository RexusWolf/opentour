import { ValueObject } from '@opentour/domain';

import { InvalidCompetitionTypeError } from '../exception';

interface Props {
  value: string;
}

export enum COMPETITION_TYPES {
  TORNEO = 'TORNEO',
  LIGA = 'LIGA',
}

export class CompetitionType extends ValueObject<Props> {
  public static fromString(type: string): CompetitionType {
    if (type.length === 0) {
      throw new Error('Competition type cannot be empty');
    }

    const typeIndex = Object.keys(COMPETITION_TYPES).indexOf(type);

    if (typeIndex === -1) {
      throw new InvalidCompetitionTypeError();
    }

    const competitionTypeValues = Object.values(COMPETITION_TYPES);

    return new CompetitionType({ value: competitionTypeValues[typeIndex] });
  }

  get value(): string {
    return this.props.value;
  }
}
