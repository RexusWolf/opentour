import { Competition, CompetitionId, CompetitionName } from '../model';

export interface Competitions {
  find(competitionId: CompetitionId): Promise<Competition | null>;
  findAll(): Promise<Competition[]>;
  findOneByName(name: CompetitionName): Promise<Competition | null>;
  save(competition: Competition): Promise<void>;
}

export const COMPETITIONS = 'COMPETITIONS';
