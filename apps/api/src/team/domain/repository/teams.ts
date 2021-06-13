import { Team, TeamId } from '../model';

export interface Teams {
  find(teamId: TeamId): Promise<Team | null>;
  save(team: Team): void;
}

export const TEAMS = 'TEAMS';
