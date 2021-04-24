import { CompetitionName } from '../model';

export class CompetitionNameAlreadyTakenError extends Error {
  public static with(name: CompetitionName): CompetitionNameAlreadyTakenError {
    return new CompetitionNameAlreadyTakenError(
      `Competition name ${name.value} already taken`
    );
  }
}
