import { CompetitionId } from '../../../competition/domain/model';
import { Team, TeamId, TeamName } from '../model';

export interface Teams {
  find(teamId: TeamId): Promise<Team | null>;
  findAll(): Promise<Team[]>;
  findOneByName(name: TeamName): Promise<Team | null>;
  findAllByCompetition(competitionId: CompetitionId): Promise<Team[] | null>;
  save(team: Team): void;
}

export const TEAMS = 'TEAMS';
