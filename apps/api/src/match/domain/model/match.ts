import { AggregateRoot } from '@nestjs/cqrs';

import { CompetitionId } from '../../../competition/domain/model';
import { TeamId } from '../../../team/domain/model';
import { LocalTeamWasAddedToMatch } from '../event/local-team-was-added-to-match';
import { MatchResultWasModified } from '../event/match-result-was-modified';
import { MatchResultWasRegistered } from '../event/match-result-was-registered';
import { MatchWasCreated } from '../event/match-was-created';
import { MatchWasDeleted } from '../event/match-was-deleted';
import { MatchWasScheduled } from '../event/match-was-scheduled';
import { VisitorTeamWasAddedToMatch } from '../event/visitor-team-was-added-to-match';
import { MatchId } from './match-id';
import { MatchIndex } from './match-index';
import { MatchJourney } from './match-journey';
import { MatchResult } from './match-result';

export class Match extends AggregateRoot {
  private _id: MatchId;
  private _competitionId: CompetitionId;
  private _index: MatchIndex;
  private _journey: MatchJourney;
  private _localTeamId: TeamId;
  private _visitorTeamId: TeamId;
  private _date?: Date;
  private _result?: MatchResult;
  private _deleted: Date | null;

  private constructor() {
    super();
  }

  public static create(params: {
    id: MatchId;
    competitionId: CompetitionId;
    localTeamId: TeamId;
    visitorTeamId: TeamId;
    index: MatchIndex;
    journey: MatchJourney;
  }): Match {
    const {
      id,
      competitionId,
      index,
      journey,
      localTeamId,
      visitorTeamId,
    } = params;

    const match = new Match();

    match.apply(
      new MatchWasCreated({
        id: id.value,
        competitionId: competitionId.value,
        localTeamId: localTeamId.value,
        visitorTeamId: visitorTeamId.value,
        index: index.value,
        journey: journey.value,
      })
    );

    return match;
  }

  get id(): MatchId {
    return this._id;
  }

  get competitionId(): CompetitionId {
    return this._competitionId;
  }

  get index(): MatchIndex {
    return this._index;
  }

  get journey(): MatchJourney | undefined {
    return this._journey;
  }

  get localTeamId(): TeamId {
    return this._localTeamId;
  }

  get visitorTeamId(): TeamId {
    return this._visitorTeamId;
  }

  get date(): Date | undefined {
    return this._date;
  }

  set date(date: Date | undefined) {
    this._date = date;
  }

  get result(): MatchResult | undefined {
    return this._result;
  }

  set result(result: MatchResult | undefined) {
    this._result = result;
  }

  isScheduled(): boolean {
    return this._date ? true : false;
  }

  isFinished(): boolean {
    return this._result ? true : false;
  }

  hasLocalTeam(): boolean {
    return this._localTeamId ? true : false;
  }

  hasVisitorTeam(): boolean {
    return this._visitorTeamId ? true : false;
  }

  addLocalTeam(teamId: TeamId): void {
    if (this.hasLocalTeam()) {
      return;
    }
    this.apply(new LocalTeamWasAddedToMatch(this.id.value, teamId.value));
  }

  addVisitorTeam(teamId: TeamId): void {
    if (this.hasVisitorTeam()) {
      return;
    }
    this.apply(new VisitorTeamWasAddedToMatch(this.id.value, teamId.value));
  }

  registerResult(result: MatchResult): void {
    if (this.isFinished()) {
      return;
    }
    this.apply(new MatchResultWasRegistered(this.id.value, result));
  }

  modifyResult(result: MatchResult): void {
    if (this.isFinished() || this._result === result) {
      return;
    }
    this.result = result;
    this.apply(
      new MatchResultWasModified(this.id.value, {
        localTeamScore: result.localTeamScore.value,
        visitorTeamScore: result.visitorTeamScore.value,
      })
    );
  }

  schedule(date: Date): void {
    if (this._date === date) {
      return;
    }
    this.date = date;
    this.apply(new MatchWasScheduled(this.id.value, date));
  }

  delete(): void {
    if (this._deleted) {
      return;
    }

    this.apply(new MatchWasDeleted(this.id.value));
  }

  private onMatchWasCreated(event: MatchWasCreated) {
    this._id = MatchId.fromString(event.id);
    this._competitionId = CompetitionId.fromString(event.competitionId);
    this._localTeamId = TeamId.fromString(event.localTeamId);
    this._visitorTeamId = TeamId.fromString(event.visitorTeamId);
    this._index = MatchIndex.fromNumber(event.index);
    this._journey = MatchJourney.fromString(event.journey);
  }
}
