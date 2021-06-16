import { AggregateRoot } from '@nestjs/cqrs';

import { CompetitionId } from '../../../competition/domain';
import { UserId } from '../../../user/domain';
import {
  MemberWasAddedToTeam,
  MemberWasRemovedFromTeam,
  TeamWasCreated,
  TeamWasDeleted,
} from '../event';
import { TeamId } from './team-id';
import { TeamLogo } from './team-logo';
import { TeamName } from './team-name';

export class Team extends AggregateRoot {
  private _id: TeamId;
  private _competitionId: CompetitionId;
  private _name: TeamName;
  private _logo: TeamLogo;
  private _captainId: UserId;
  private _membersIds: UserId[];
  private _deleted: Date;

  private constructor() {
    super();
  }

  public static create(params: {
    id: TeamId;
    competitionId: CompetitionId;
    name: TeamName;
    logo: TeamLogo;
    captainId: UserId;
  }): Team {
    const { id, competitionId, name, captainId, logo } = params;
    const team = new Team();

    team.apply(
      new TeamWasCreated({
        id: id.value,
        competitionId: competitionId.value,
        name: name.value,
        captainId: captainId.value,
        logo: logo.value,
      })
    );

    return team;
  }

  get id(): CompetitionId {
    return this._id;
  }

  get competitionId(): CompetitionId {
    return this._competitionId;
  }

  get name(): TeamName {
    return this._name;
  }

  get logo(): TeamLogo {
    return this._logo;
  }

  get captainId(): UserId {
    return this._captainId;
  }

  get membersIds(): UserId[] {
    return this._membersIds;
  }

  set membersIds(members: UserId[]) {
    this._membersIds = members;
  }

  isCaptain(userId: UserId): boolean {
    return this._captainId === userId;
  }

  isMember(userId: UserId): boolean {
    return this._membersIds.some((item: UserId) => item.equals(userId));
  }

  addMember(userId: UserId): void {
    if (this.isMember(userId)) {
      return;
    }

    this.apply(new MemberWasAddedToTeam(this.id.value, userId.value));
  }

  removeMember(userId: UserId): void {
    if (this.isMember(userId)) {
      return;
    }

    this.apply(new MemberWasRemovedFromTeam(this.id.value, userId.value));
  }

  delete(): void {
    if (this._deleted) {
      return;
    }

    this.apply(new TeamWasDeleted(this.id.value));
  }

  private onTeamWasCreated(event: TeamWasCreated) {
    this._id = TeamId.fromString(event.id);
    this._competitionId = CompetitionId.fromString(event.competitionId);
    this._name = TeamName.fromString(event.name);
    this._captainId = UserId.fromString(event.captainId);
    this._membersIds = [UserId.fromString(event.captainId)];
    this._logo = TeamLogo.fromString(event.logo);
  }
}
