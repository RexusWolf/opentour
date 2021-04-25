import { MatchId } from '../model';

export class MatchIdAlreadyTakenError extends Error {
  public static with(matchId: MatchId): MatchIdAlreadyTakenError {
    return new MatchIdAlreadyTakenError(
      `Match id ${matchId.value} already taken`
    );
  }
}
