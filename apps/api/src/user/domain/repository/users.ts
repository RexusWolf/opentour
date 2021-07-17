import { EmailAddress, User, UserId } from '../model';

export interface Users {
  find(userId: UserId): Promise<User | null>;
  findAll(): Promise<User[]>;
  findOneByEmail(email: EmailAddress): Promise<User | null>;
  save(user: User): void;
}

export const USERS = 'USERS';
