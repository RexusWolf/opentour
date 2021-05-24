import {
  CompetitionIdAlreadyTakenError,
  CompetitionNameAlreadyTakenError,
} from '../../../src/competition/domain/exception';
import {
  Competition,
  CompetitionId,
  CompetitionName,
} from '../../../src/competition/domain/model';
import { Competitions } from '../../../src/competition/domain/repository';

export class CompetitionRepositoryDouble implements Competitions {
  readonly mockSave = jest.fn();
  private throwOnFind = false;
  private throwOnFindOne = false;

  constructor(params?: { throwOnFindOne: boolean; throwOnFind: boolean }) {
    if (params) {
      this.throwOnFind = params.throwOnFind;
      this.throwOnFindOne = params.throwOnFindOne;
    }
  }
  async find(competitionId: CompetitionId): Promise<Competition | null> {
    if (this.throwOnFind) {
      throw CompetitionIdAlreadyTakenError.with(competitionId);
    }
    return null;
  }
  async findAll(): Promise<Competition[]> {
    throw new Error();
  }
  async findOneByName(name: CompetitionName): Promise<Competition | null> {
    if (this.throwOnFindOne) {
      throw CompetitionNameAlreadyTakenError.with(name);
    }
    return null;
  }
  async save(competition: Competition): Promise<void> {
    this.mockSave(competition);
  }
}
