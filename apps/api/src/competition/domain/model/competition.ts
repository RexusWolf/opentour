import { AggregateRoot } from '@nestjs/cqrs';

import { SportName } from '../../../sport/domain';
import { UserId } from '../../../user/domain';
import { UpdateCompetitionCommand } from '../../application';
import {
  CompetitionModeratorWasRemoved,
  CompetitionWasCreated,
  CompetitionWasDeleted,
  CompetitionWasStarted,
  CompetitionWasUpdated,
  ModeratorWasAddedToCompetition,
} from '../event';
import { CompetitionId } from './competition-id';
import { CompetitionName } from './competition-name';
import { CompetitionType } from './competition-type';

export class Competition extends AggregateRoot {
  private _id: CompetitionId;
  private _name: CompetitionName;
  private _type: CompetitionType;
  private _sportName: SportName;
  private _moderatorIds: UserId[];
  private _hasStarted: boolean;
  private _deleted?: Date;

  private constructor() {
    super();
  }

  public static create(params: {
    id: CompetitionId;
    name: CompetitionName;
    type: CompetitionType;
    sportName: SportName;
    moderatorId: UserId;
  }): Competition {
    const { id, name, type, sportName, moderatorId } = params;
    const competition = new Competition();

    const event = new CompetitionWasCreated(
      id.value,
      name.value,
      type.value,
      sportName.value,
      moderatorId.value
    );
    competition.apply(event);

    return competition;
  }

  get id(): CompetitionId {
    return this._id;
  }

  get name(): CompetitionName {
    return this._name;
  }

  set name(name: CompetitionName) {
    this._name = name;
  }

  get type(): CompetitionType {
    return this._type;
  }

  get sportName(): SportName {
    return this._sportName;
  }

  get moderatorIds(): UserId[] {
    return Array.from(this._moderatorIds);
  }

  get hasStarted(): boolean {
    return this._hasStarted;
  }

  set hasStarted(hasStarted: boolean) {
    this._hasStarted = hasStarted;
  }

  start() {
    this.apply(new CompetitionWasStarted(this.id.value));
  }

  isModerator(userId: UserId): boolean {
    return this._moderatorIds.some((item: UserId) => item.equals(userId));
  }

  addModerator(userId: UserId): void {
    if (this.isModerator(userId)) {
      return;
    }
    this.apply(new ModeratorWasAddedToCompetition(this.id.value, userId.value));
  }

  hasModerator(userId: UserId): boolean {
    return this._moderatorIds.some((item: UserId) => item.equals(userId));
  }

  removeModerator(userId: UserId): void {
    if (!this.hasModerator(userId)) {
      return;
    }

    this.apply(new CompetitionModeratorWasRemoved(this.id.value, userId.value));
  }

  delete(): void {
    if (this._deleted) {
      return;
    }

    this.apply(new CompetitionWasDeleted(this._id.value));
  }

  update(command: UpdateCompetitionCommand): void {
    this.name = CompetitionName.fromString(command.name);
    this.updateModerators(command.moderatorIds);
    const event = new CompetitionWasUpdated(
      this._id.value,
      this._name.value,
      this._moderatorIds.map((id) => id.value)
    );
    this.apply(event);
  }

  private updateModerators(newModeratorIds: string[]) {
    const rawModeratorIds = this.moderatorIds.map((id) => id.value);
    for (const id of newModeratorIds) {
      if (!rawModeratorIds.includes(id))
        this.addModerator(UserId.fromString(id));
    }
  }

  private onCompetitionWasCreated(event: CompetitionWasCreated) {
    this._id = CompetitionId.fromString(event.id);
    this._name = CompetitionName.fromString(event.name);
    this._type = CompetitionType.fromString(event.type);
    this._sportName = SportName.fromString(event.sportName);
    this._moderatorIds = [UserId.fromString(event.moderatorId)];
    this._hasStarted = false;
  }

  private onCompetitionWasStarted(event: CompetitionWasStarted){
    this._hasStarted = true;
  }
}
