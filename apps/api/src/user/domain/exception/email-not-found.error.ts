import { EmailAddress } from '../model';

export class EmailNotFoundError extends Error {
  public static with(email: EmailAddress): EmailNotFoundError {
    return new EmailNotFoundError(`Email ${email.value} not found`);
  }
}
