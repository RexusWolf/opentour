import { AggregateRoot } from '@nestjs/cqrs';

import { SportId } from '../../../sport/domain/model/sport-id';
import { UserId } from '../../../user/domain';
import { CompetitionModeratorWasRemoved } from '../event/competition-moderator-was-removed.event';
import { CompetitionWasCreated } from '../event/competition-was-created.event';
import { CompetitionWasDeleted } from '../event/competition-was-deleted.event';
import { ModeratorWasAddedToCompetition } from '../event/moderator-was-added-to-competition.event';
import { CompetitionId } from './competition-id';
import { CompetitionName } from './competition-name';
import { CompetitionType } from './competition-type';

export class Competition extends AggregateRoot {
  private _id: CompetitionId;
  private _name: CompetitionName;
  private _type: CompetitionType;
  private _sportId: SportId;
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
    sportId: SportId;
    moderatorId: UserId;
  }): Competition {
    const { id, name, type, sportId, moderatorId } = params;
    const competition = new Competition();

    const event = new CompetitionWasCreated(
      id.value,
      name.value,
      type.value,
      sportId.value,
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

  get type(): CompetitionType {
    return this._type;
  }

  get sportId(): SportId {
    return this._sportId;
  }

  get moderatorIds(): UserId[] {
    return Array.from(this._moderatorIds);
  }

  hasStarted(): boolean {
    return this._hasStarted;
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

  private onCompetitionWasCreated(event: CompetitionWasCreated) {
    this._id = CompetitionId.fromString(event.id);
    this._name = CompetitionName.fromString(event.name);
    this._type = CompetitionType.fromString(event.type);
    this._sportId = SportId.fromString(event.sportId);
    this._moderatorIds = [UserId.fromString(event.moderatorId)];
  }
}
