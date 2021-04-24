import { ValueObject } from '@opentour/domain';

interface Props {
  value: string;
}

export class CompetitionType extends ValueObject<Props> {
  public static fromString(type: string): CompetitionType {
    if (type.length === 0) {
      throw new Error('Competition type cannot be empty');
    }

    type = type.toUpperCase();

    return new CompetitionType({ value: type });
  }

  get value(): string {
    return this.props.value;
  }
}
