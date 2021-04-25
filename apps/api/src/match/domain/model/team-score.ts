import { ValueObject } from '@opentour/domain';

interface Props {
  value: number;
}

export class TeamScore extends ValueObject<Props> {
  public static fromNumber(index: number): TeamScore {
    return new TeamScore({ value: index });
  }

  get value(): number {
    return this.props.value;
  }
}
