import { ValueObject } from '@opentour/domain';

interface Props {
  value: string;
}

export class CompetitionName extends ValueObject<Props> {
  public static fromString(name: string): CompetitionName {
    if (name.length === 0) {
      throw new Error('Competition name cannot be empty');
    }

    if (!/^[a-zA-Z0-9ñÑ]+$/.test(name)) {
      throw new Error('Invalid competition name characters');
    }

    return new CompetitionName({ value: name });
  }

  get value(): string {
    return this.props.value;
  }
}
