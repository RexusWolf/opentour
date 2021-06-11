import { ValueObject } from '@opentour/domain';

interface Props {
  value: string;
}

export class SportName extends ValueObject<Props> {
  public static fromString(name: string): SportName {
    if (name.length === 0) {
      throw new Error('Sport name cannot be empty');
    }

    return new SportName({ value: name });
  }

  get value(): string {
    return this.props.value;
  }
}
