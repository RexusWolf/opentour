import { EmailAddress } from '../model';

export class EmailAlreadyTakenError extends Error {
  public static with(email: EmailAddress): EmailAlreadyTakenError {
    return new EmailAlreadyTakenError(`Email ${email.value} already taken`);
  }
}
