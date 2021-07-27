import { Provider } from '@nestjs/common';
import { Connection } from 'mongoose';

import { DATABASE_CONNECTION } from '../../common/database/database.provider';
import { USERS } from '../domain/repository/users';
import { UserMapper } from './repository/user.mapper';
import { USER_MODEL,UserSchema } from './repository/user.model';
import { UserRepository } from './repository/user.repository';

export const userProviders: Provider[] = [
  {
    provide: USER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: USERS,
    useClass: UserRepository,
  },
  {
    provide: UserMapper,
    useClass: UserMapper,
  },
];
