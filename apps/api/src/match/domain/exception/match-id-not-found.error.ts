import { MatchId } from '../model';

export class MatchIdNotFoundError extends Error {
  public static with(matchId: MatchId): MatchIdNotFoundError {
    return new MatchIdNotFoundError(`Match id ${matchId.value} not found`);
  }
}
