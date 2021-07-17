import { ValueObject } from '@opentour/domain';

interface Props {
  value: string;
}

class Subject extends ValueObject<Props> {
  public static fromString(name: string): Subject {
    return new Subject({ value: name });
  }

  get value(): string {
    return this.props.value;
  }
}

export default Subject;
