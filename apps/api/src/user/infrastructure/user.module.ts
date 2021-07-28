import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthModule } from '../../auth/auth.module';
import { DatabaseModule } from '../../common/database/database.module';
import { CreateUserHandler } from '../application/command/create-user.handler';
import { DeleteUserHandler } from '../application/command/delete-user.handler';
import { UpdateUserHandler } from '../application/command/update-user.handler';
import { GetUserHandler } from '../application/query/get-user.handler';
import { GetUserByEmailHandler } from '../application/query/get-user-by-email.handler';
import { GetUsersHandler } from '../application/query/get-users.handler';
import { UserController } from './controller/user.controller';
import { UserWasDeletedSaga } from './saga/user-was-deleted.saga';
import { userProviders } from './user.providers';

const CommandHandlers = [CreateUserHandler, DeleteUserHandler];
const QueryHandlers = [
  GetUserByEmailHandler,
  GetUserHandler,
  GetUsersHandler,
  UpdateUserHandler,
];
const Sagas = [UserWasDeletedSaga];

@Module({
  controllers: [UserController],
  imports: [AuthModule, CqrsModule, DatabaseModule],
  exports: [...userProviders],
  providers: [...userProviders, ...CommandHandlers, ...QueryHandlers, ...Sagas],
})
export class UserModule {}
