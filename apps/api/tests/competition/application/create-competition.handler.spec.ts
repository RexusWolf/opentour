import { CreateCompetitionHandler } from '../../../src/competition/application';
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
});
