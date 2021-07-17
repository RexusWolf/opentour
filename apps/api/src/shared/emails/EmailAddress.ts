import { ValueObject } from '@opentour/domain';

interface Props {
  value: string;
}

class EmailAddress extends ValueObject<Props> {
  public static fromString(name: string): EmailAddress {
    return new EmailAddress({ value: name });
  }

  get value(): string {
    return this.props.value;
  }
}

export default EmailAddress;
