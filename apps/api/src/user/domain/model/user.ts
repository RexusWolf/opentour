import { AggregateRoot } from '@nestjs/cqrs';

import {
  UserRoleWasAdded,
  UserRoleWasRemoved,
  UserWasCreated,
  UserWasDeleted,
} from '../event';
import { EmailAddress } from './email-address';
import { Role } from './role';
import { UserId } from './user-id';

export class User extends AggregateRoot {
  private _userId: UserId;
  private _email: EmailAddress;
  private _roles: Role[];
  private _deleted?: Date;

  private constructor() {
    super();
  }

  public static add(userId: UserId, email: EmailAddress): User {
    const user = new User();

    user.apply(new UserWasCreated(userId.value, email.value));

    return user;
  }

  get id(): UserId {
    return this._userId;
  }

  get email(): EmailAddress {
    return this._email;
  }

  get roles(): Role[] {
    return Array.from(this._roles);
  }

  hasRole(role: Role): boolean {
    return this._roles.some((item: Role) => item.equals(role));
  }

  addRole(role: Role): void {
    if (this.hasRole(role)) {
      return;
    }

    this.apply(new UserRoleWasAdded(this.id.value, role.value));
  }

  removeRole(role: Role): void {
    if (!this.hasRole(role)) {
      return;
    }

    this.apply(new UserRoleWasRemoved(this.id.value, role.value));
  }

  delete(): void {
    if (this._deleted) {
      return;
    }

    this.apply(new UserWasDeleted(this.id.value));
  }

  private onUserWasCreated(event: UserWasCreated) {
    this._userId = UserId.fromString(event.id);
    this._email = EmailAddress.fromString(event.email);
    this._roles = [];
    this._deleted = undefined;
  }

  private onUserRoleWasAdded(event: UserRoleWasAdded) {
    this._roles.push(Role.fromString(event.role));
  }

  private onUserRoleWasRemoved(event: UserRoleWasRemoved) {
    this._roles = this._roles.filter(
      (item: Role) => !item.equals(Role.fromString(event.role))
    );
  }

  private onUserWasDeleted(event: UserWasDeleted) {
    this._deleted = event.createdOn;
  }
}
