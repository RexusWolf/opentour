import { Email } from './email';

describe('Email', () => {
  it('should not be empty', () => {
    expect(() => {
      Email.fromString('');
    }).toThrow();
  });
  it('must be a valid email', () => {
    expect(() => {
      Email.fromString('notValidEmail');
    }).toThrow();
  });
});
