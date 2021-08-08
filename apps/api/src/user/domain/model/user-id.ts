import { ValueObject } from '@opentour/domain';
import { v4 as uuid } from 'uuid';

interface Props {
  value: string;
}

export class UserId extends ValueObject<Props> {
  static generate(): UserId {
    return new UserId({ value: uuid() });
  }

  public static fromString(id: string): UserId {
    return new UserId({ value: id });
  }

  get value(): string {
    return this.props.value;
  }
}
