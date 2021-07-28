import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { User, UserId, USERS, Users, UserWasDeleted } from '../../domain';

@EventsHandler(UserWasDeleted)
export class UserWasDeletedSaga implements IEventHandler<UserWasDeleted> {
  constructor(@Inject(USERS) private userRepository: Users) {}

  async handle(event: UserWasDeleted) {
    const user = await this.userRepository.find(UserId.fromString(event.id));

    if (!user) {
      return;
    }

    user.delete();

    this.userRepository.save(user);
  }
}
