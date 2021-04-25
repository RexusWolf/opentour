import { CompetitionId } from '../../../competition/domain/model';
import { Match, MatchId } from '../model';

export interface Matches {
  find(matchId: MatchId): Promise<Match | null>;
  findAll(): Promise<Match[]>;
  findAllByCompetition(competitionId: CompetitionId): Promise<Match[] | null>;
  save(match: Match): void;
}

export const MATCHES = 'MATCHES';
