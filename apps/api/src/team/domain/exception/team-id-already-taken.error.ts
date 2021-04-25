import { TeamId } from '../model';

export class TeamIdAlreadyTakenError extends Error {
  public static with(teamId: TeamId): TeamIdAlreadyTakenError {
    return new TeamIdAlreadyTakenError(`Team id ${teamId.value} already taken`);
  }
}
