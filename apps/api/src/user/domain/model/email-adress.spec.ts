import { EmailAddress } from './email-address';

describe('Email', () => {
  it('should not be empty', () => {
    expect(() => {
      EmailAddress.fromString('');
    }).toThrow();
  });
  it('must be a valid email', () => {
    expect(() => {
      EmailAddress.fromString('notValidEmail');
    }).toThrow();
  });
});
