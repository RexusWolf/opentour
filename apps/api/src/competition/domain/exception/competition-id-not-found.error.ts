import { CompetitionId } from '../model';

export class CompetitionIdNotFoundError extends Error {
  public static with(competitionId: CompetitionId): CompetitionIdNotFoundError {
    return new CompetitionIdNotFoundError(
      `Competition id ${competitionId.value} not found`
    );
  }
}
