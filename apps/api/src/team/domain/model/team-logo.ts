import { ValueObject } from '@opentour/domain';

interface Props {
  value: string;
}

export class TeamLogo extends ValueObject<Props> {
  public static fromString(logo: string): TeamLogo {
    if (logo.length === 0) {
      throw new Error('Team logo cannot be empty');
    }

    return new TeamLogo({ value: logo });
  }

  get value(): string {
    return this.props.value;
  }
}
