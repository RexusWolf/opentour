import { ValueObject } from '@opentour/domain';

interface Props {
  value: string;
}

export class TeamName extends ValueObject<Props> {
  public static fromString(name: string): TeamName {
    if (name.length === 0) {
      throw new Error('Team name cannot be empty');
    }

    if (!/^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/i.test(name)) {
      throw new Error('Invalid team name characters');
    }

    return new TeamName({ value: name });
  }

  get value(): string {
    return this.props.value;
  }
}
