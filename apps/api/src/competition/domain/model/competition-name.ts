import { ValueObject } from '@opentour/domain';

interface Props {
  value: string;
}

export class CompetitionName extends ValueObject<Props> {
  public static fromString(name: string): CompetitionName {
    if (name.length === 0) {
      throw new Error('Competition name cannot be empty');
    }

    return new CompetitionName({ value: name });
  }

  get value(): string {
    return this.props.value;
  }
}
