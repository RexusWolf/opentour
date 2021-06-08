import { ValueObject } from '@opentour/domain';

interface Props {
  value: string;
}

export class MatchJourney extends ValueObject<Props> {
  public static fromString(name: string): MatchJourney {
    if (name.length === 0) {
      throw new Error('Match journey cannot be empty');
    }

    return new MatchJourney({ value: name });
  }

  get value(): string {
    return this.props.value;
  }
}
