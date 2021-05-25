import { CreateCompetitionHandler } from '../../../src/competition/application';
import {
  CompetitionIdAlreadyTakenError,
  CompetitionNameAlreadyTakenError,
} from '../../../src/competition/domain/exception';
import { CompetitionMapper } from '../../../src/competition/infrastructure/repository/competition.mapper';
import { CompetitionBuilder } from '../builders/CompetitionBuilder';
import { CreateCompetitionCommandBuilder } from '../builders/CreateCompetitionCommandBuilder';
import { CompetitionRepositoryDouble } from '../doubles/CompetitionRepository.mock';

describe('Create competition handler', () => {
  it('should create a competition with the provided command and save it', async () => {
    const repository = new CompetitionRepositoryDouble();
    const competitionMapper = new CompetitionMapper();
    const handler = new CreateCompetitionHandler(repository, competitionMapper);
    const command = CreateCompetitionCommandBuilder.random();
    const competition = CompetitionBuilder.fromCommand(command);

    await handler.execute(command);

    expect(repository.mockSave).toHaveBeenCalledWith(competition);
  });

  it('should not create a competition if there is an existing competition with same id', async () => {
    const repository = new CompetitionRepositoryDouble({ throwOnFind: true });
    const competitionMapper = new CompetitionMapper();
    const handler = new CreateCompetitionHandler(repository, competitionMapper);
    const command = CreateCompetitionCommandBuilder.random();

    await expect(() => handler.execute(command)).rejects.toThrowError(
      CompetitionIdAlreadyTakenError
    );

    expect(repository.mockSave).not.toHaveBeenCalled();
  });

  it('should not create a competition if there is an existing competition with same name', async () => {
    const repository = new CompetitionRepositoryDouble({
      throwOnFindByName: true,
    });
    const competitionMapper = new CompetitionMapper();
    const handler = new CreateCompetitionHandler(repository, competitionMapper);
    const command = CreateCompetitionCommandBuilder.random();

    await expect(() => handler.execute(command)).rejects.toThrowError(
      CompetitionNameAlreadyTakenError
    );

    expect(repository.mockSave).not.toHaveBeenCalled();
  });
});
