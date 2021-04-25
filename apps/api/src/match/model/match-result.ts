import { TeamScore } from './team-score';

export class MatchResult {
  private _localTeamScore: TeamScore;
  private _visitorTeamScore: TeamScore;

  constructor(data: {
    localTeamScore: TeamScore;
    visitorTeamScore: TeamScore;
  }) {
    this._localTeamScore = data.localTeamScore;
    this._visitorTeamScore = data.visitorTeamScore;
  }

  public static fromTeamScore(
    localTeamScore: number,
    visitorTeamScore: number
  ): MatchResult {
    return new MatchResult({
      localTeamScore: TeamScore.fromNumber(localTeamScore),
      visitorTeamScore: TeamScore.fromNumber(visitorTeamScore),
    });
  }
}
