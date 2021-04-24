import { CompetitionId } from '../model';

export class CompetitionIdAlreadyTakenError extends Error {
  public static with(
    competitionId: CompetitionId
  ): CompetitionIdAlreadyTakenError {
    return new CompetitionIdAlreadyTakenError(
      `Competition id ${competitionId.value} already taken`
    );
  }
}
