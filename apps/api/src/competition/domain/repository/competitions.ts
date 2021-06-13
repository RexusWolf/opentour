import { Competition, CompetitionId } from '../model';

export interface Competitions {
  find(competitionId: CompetitionId): Promise<Competition | null>;
  save(competition: Competition): void;
}

export const COMPETITIONS = 'COMPETITIONS';
