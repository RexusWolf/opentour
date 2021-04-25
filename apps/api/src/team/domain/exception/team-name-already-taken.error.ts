import { TeamName } from '../model';

export class TeamNameAlreadyTakenError extends Error {
  public static with(name: TeamName): TeamNameAlreadyTakenError {
    return new TeamNameAlreadyTakenError(
      `Team name ${name.value} already taken`
    );
  }
}
