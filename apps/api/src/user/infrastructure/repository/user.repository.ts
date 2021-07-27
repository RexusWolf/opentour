import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Model } from 'mongoose';

import { EmailAddress, User, UserId, Users } from '../../domain';
import { UserMapper } from './user.mapper';
import { USER_MODEL,UserDocument } from './user.model';

@Injectable()
export class UserRepository implements Users {
  constructor(
    @Inject(USER_MODEL)
    private userModel: Model<UserDocument>,
    private userMapper: UserMapper,
    private publisher: EventPublisher
  ) {}

  async find(userId: UserId): Promise<User | null> {
    const user = await this.userModel.findById(userId.value);

    if (!user) {
      return null;
    }

    return this.userMapper.documentToAggregate(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();

    return users.map(this.userMapper.documentToAggregate);
  }

  async findOneByEmail(email: EmailAddress): Promise<User | null> {
    const user = await this.userModel.findOne({
      email: email.value,
    });

    if (!user) {
      return null;
    }

    return this.userMapper.documentToAggregate(user);
  }

  async save(user: User): Promise<void> {
    const userDocument = this.userMapper.aggregateToDocument(user);
    await this.userModel.updateOne({ _id: user.id.value }, userDocument, {
      upsert: true,
    });

    user = this.publisher.mergeObjectContext(user);
    user.commit();
  }
}
