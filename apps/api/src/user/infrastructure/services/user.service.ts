import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import EmailAddress from '../../../shared/emails/EmailAddress';
import { User, USERS, Users } from '../../domain';
import { UserDocument } from '../repository/user.model';

@Injectable()
export class UserService {
  constructor(@Inject(USERS) private users: Users) {}

  async validatePassword(email: string, password: string): Promise<boolean> {
    const user = await this.users.findOneByEmail(
      EmailAddress.fromString(email)
    );

    if (!user) {
      return false;
    }

    return bcrypt.compare(password, user.password.value);
  }
}
