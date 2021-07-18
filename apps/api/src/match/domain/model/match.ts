import { AggregateRoot } from '@nestjs/cqrs';

import { CompetitionId } from '../../../competition/domain';
import { TeamId } from '../../../team/domain';
import {
  MatchResultWasModified,
  MatchTeamsWereModified,
  MatchWasCreated,
  MatchWasDeleted,
  MatchWasScheduled,
} from '../event';
import { MatchId } from './match-id';
import { MatchIndex } from './match-index';
import { MatchJourney } from './match-journey';
import { MatchResult } from './match-result';

export class Match extends AggregateRoot {
  private _id: MatchId;
  private _competitionId: CompetitionId;
  private _index: MatchIndex;
  private _journey: MatchJourney;
  private _result: MatchResult;
  private _deleted: Date | null;
  private _localTeamId?: TeamId;
  private _visitorTeamId?: TeamId;
  private _date?: Date;

  private constructor() {
    super();
  }

  public static create(params: {
    id: MatchId;
    competitionId: CompetitionId;
    index: MatchIndex;
    journey: MatchJourney;
    localTeamId?: TeamId;
    visitorTeamId?: TeamId;
  }): Match {
    const { id, competitionId, index, journey, localTeamId, visitorTeamId } =
      params;

    const match = new Match();

    match.apply(
      new MatchWasCreated({
        id: id.value,
        competitionId: competitionId.value,
        localTeamId: localTeamId?.value,
        visitorTeamId: visitorTeamId?.value,
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

  get localTeamId(): TeamId | undefined {
    return this._localTeamId;
  }

  set localTeamId(localTeamId: TeamId | undefined) {
    this._localTeamId = localTeamId;
  }

  get visitorTeamId(): TeamId | undefined {
    return this._visitorTeamId;
  }

  set visitorTeamId(visitorTeamId: TeamId | undefined) {
    this._visitorTeamId = visitorTeamId;
  }

  get date(): Date | undefined {
    return this._date;
  }

  set date(date: Date | undefined) {
    this._date = date;
  }

  get result(): MatchResult {
    return this._result;
  }

  set result(result: MatchResult) {
    this._result = result;
  }

  isScheduled(): boolean {
    return this._date ? true : false;
  }

  hasLocalTeam(): boolean {
    return this._localTeamId ? true : false;
  }

  hasVisitorTeam(): boolean {
    return this._visitorTeamId ? true : false;
  }

  modifyMatchTeams(localTeamId?: TeamId, visitorTeamId?: TeamId) {
    this.apply(
      new MatchTeamsWereModified({
        id: this.id.value,
        localTeamId: localTeamId?.value,
        visitorTeamId: visitorTeamId?.value,
      })
    );
  }

  resultIsEqual(newResult: MatchResult) {
    if (
      this.result.localTeamScore.equals(newResult.localTeamScore) &&
      this.result.visitorTeamScore.equals(newResult.visitorTeamScore)
    ) {
      return true;
    }
    return false;
  }

  modifyMatchResult(newResult: MatchResult): void {
    if (
      this.resultIsEqual(newResult) ||
      !this.localTeamId ||
      !this.visitorTeamId
    ) {
      return;
    }
    this.apply(
      new MatchResultWasModified({
        id: this.id.value,
        index: this.index.value,
        competitionId: this.competitionId.value,
        localTeam: {
          id: this.localTeamId.value,
          score: newResult.localTeamScore.value,
        },
        visitorTeam: {
          id: this.visitorTeamId.value,
          score: newResult.visitorTeamScore.value,
        },
      })
    );
  }

  schedule(date: Date): void {
    if (this._date === date) {
      return;
    }
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
    this._localTeamId = event.localTeamId
      ? TeamId.fromString(event.localTeamId)
      : undefined;
    this._visitorTeamId = event.visitorTeamId
      ? TeamId.fromString(event.visitorTeamId)
      : undefined;
    this._index = MatchIndex.fromNumber(event.index);
    this._journey = MatchJourney.fromString(event.journey);
    this._result = MatchResult.fromTeamScore(0, 0);
  }

  private onMatchResultWasModified(event: MatchResultWasModified) {
    this._result = MatchResult.fromTeamScore(
      event.localTeam.score,
      event.visitorTeam.score
    );
  }

  private onMatchTeamsWereModified(event: MatchTeamsWereModified) {
    if (event.localTeamId) {
      this._localTeamId = TeamId.fromString(event.localTeamId);
    }
    if (event.visitorTeamId) {
      this._visitorTeamId = TeamId.fromString(event.visitorTeamId);
    }
  }

  private onMatchWasScheduled(event: MatchWasScheduled) {
    this._date = event.date;
  }
}
