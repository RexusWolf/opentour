/* eslint-disable no-useless-escape */
import { ValueObject } from '@opentour/domain';

interface Props {
  value: string;
}

export class EmailAddress extends ValueObject<Props> {
  public static fromString(email: string): EmailAddress {
    if (email.length === 0) {
      throw new Error('Email cannot be empty');
    }
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      throw new Error('Email must be a valid email');
    }

    return new EmailAddress({ value: email });
  }

  get value(): string {
    return this.props.value;
  }
}
