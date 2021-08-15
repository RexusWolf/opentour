import faker = require('faker');
import EmailAddress from '../../../src/shared/emails/EmailAddress';
import { User, UserId } from '../../../src/user/domain';

export class UserBuilder {
  static random(): User {
    return User.add(
      UserId.fromString(faker.datatype.uuid()),
      EmailAddress.fromString(faker.internet.email())
    );
  }
}
