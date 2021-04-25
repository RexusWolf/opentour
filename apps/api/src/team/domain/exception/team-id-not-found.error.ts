import { TeamId } from '../model';

export class TeamIdNotFoundError extends Error {
  public static with(teamId: TeamId): TeamIdNotFoundError {
    return new TeamIdNotFoundError(`Team id ${teamId.value} not found`);
  }
}
