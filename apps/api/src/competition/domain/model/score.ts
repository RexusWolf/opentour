import { ValueObject } from '@opentour/domain';

interface Props {
  value: number;
}

export class Score extends ValueObject<Props> {
  public static fromNumber(index: number): Score {
    return new Score({ value: index });
  }

  get value(): number {
    return this.props.value;
  }
}
