import { ValueObject } from '@opentour/domain';

interface Props {
  value: string;
}

class EmailBody extends ValueObject<Props> {
  public static fromString(name: string): EmailBody {
    return new EmailBody({ value: name });
  }

  get value(): string {
    return this.props.value;
  }
}

export default EmailBody;
