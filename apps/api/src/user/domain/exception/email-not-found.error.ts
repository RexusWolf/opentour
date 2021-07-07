import { Email } from '../model';

export class EmailNotFoundError extends Error {
  public static with(email: Email): EmailNotFoundError {
    return new EmailNotFoundError(`Email ${email.value} not found`);
  }
}
