import { ValueObject } from '@opentour/domain';

interface Props {
  value: string;
}

export class Journey extends ValueObject<Props> {
  public static fromString(name: string): Journey {
    if (name.length === 0) {
      throw new Error('Journey cannot be empty');
    }

    return new Journey({ value: name });
  }

  get value(): string {
    return this.props.value;
  }
}
