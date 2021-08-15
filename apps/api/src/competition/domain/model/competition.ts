import { AggregateRoot } from '@nestjs/cqrs';
import { Journey } from '../../../shared/domain';
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
import { CompetitionNextRoundWasStarted } from '../event/competition-next-round-was-started.event';
import { CompetitionId } from './competition-id';
import { CompetitionName } from './competition-name';
import { CompetitionType } from './competition-type';
import { Score } from './score';
import { SportName } from './sport-name';

type ScoreSystem = { victory: Score; tie: Score; defeat: Score };

export class Competition extends AggregateRoot {
  private _id: CompetitionId;
  private _name: CompetitionName;
  private _type: CompetitionType;
  private _sportName: SportName;
  private _moderatorIds: UserId[];
  private _scoreSystem: ScoreSystem;
  private _hasStarted: boolean;
  private _currentJourney?: Journey;
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
    scoreSystem: ScoreSystem;
  }): Competition {
    const { id, name, type, sportName, moderatorId, scoreSystem } = params;
    const competition = new Competition();

    const event = new CompetitionWasCreated({
      id: id.value,
      name: name.value,
      type: type.value,
      sportName: sportName.value,
      moderatorId: moderatorId.value,
      scoreSystem: {
        victory: scoreSystem.victory.value,
        defeat: scoreSystem.defeat.value,
        tie: scoreSystem.tie.value,
      },
    });
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

  get scoreSystem(): ScoreSystem {
    return this._scoreSystem;
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

  get currentJourney(): Journey | undefined {
    return this._currentJourney;
  }

  set currentJourney(journey: Journey | undefined) {
    this._currentJourney = journey;
  }

  start(currentJourney?: string) {
    this.apply(new CompetitionWasStarted(this.id.value, currentJourney));
  }

  nextRound(nextJourney: string) {
    this.apply(new CompetitionNextRoundWasStarted(this.id.value, nextJourney));
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
    this._scoreSystem = {
      victory: Score.fromNumber(event.scoreSystem.victory),
      tie: Score.fromNumber(event.scoreSystem.tie),
      defeat: Score.fromNumber(event.scoreSystem.defeat),
    };
  }

  private onCompetitionWasStarted(event: CompetitionWasStarted) {
    this._hasStarted = true;
    this._currentJourney = event.currentJourney
      ? Journey.fromString(event.currentJourney)
      : undefined;
  }

  private onModeratorWasAddedToCompetition(
    event: ModeratorWasAddedToCompetition
  ) {
    this._moderatorIds = [
      ...this.moderatorIds,
      UserId.fromString(event.userId),
    ];
  }

  private onCompetitionNextRoundWasStarted(
    event: CompetitionNextRoundWasStarted
  ) {
    this._currentJourney = Journey.fromString(event.nextJourney);
  }
}
