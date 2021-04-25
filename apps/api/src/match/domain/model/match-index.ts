import { ValueObject } from '@opentour/domain';

interface Props {
  value: number;
}

export class MatchIndex extends ValueObject<Props> {
  public static fromNumber(index: number): MatchIndex {
    return new MatchIndex({ value: index });
  }

  get value(): number {
    return this.props.value;
  }
}
