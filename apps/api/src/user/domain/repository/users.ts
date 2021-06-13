import { User, UserId, Username } from '../model';

export interface Users {
  find(userId: UserId): Promise<User | null>;
  findAll(): Promise<User[]>;
  findOneByUsername(username: Username): Promise<User | null>;
  save(user: User): void;
}

export const USERS = 'USERS';
