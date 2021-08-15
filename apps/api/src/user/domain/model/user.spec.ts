import { EmailAddress } from './email-address';
import { User } from './user';
import { UserId } from './user-id';

describe('User', () => {
  it('should create a user entity', () => {
    const email = EmailAddress.fromString('test@uco.es');
    const userId = UserId.fromString('testId');

    const user = User.add(userId, email);

    expect(user).toBeInstanceOf(User);
  });
});
