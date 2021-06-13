import { Match, MatchId } from '../model';

export interface Matches {
  find(matchId: MatchId): Promise<Match | null>;
  save(match: Match): void;
}

export const MATCHES = 'MATCHES';
