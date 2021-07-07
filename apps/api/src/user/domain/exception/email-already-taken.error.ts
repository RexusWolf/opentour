import { Email } from '../model';

export class EmailAlreadyTakenError extends Error {
  public static with(email: Email): EmailAlreadyTakenError {
    return new EmailAlreadyTakenError(`Email ${email.value} already taken`);
  }
}
