import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CompetitionDTO,
  CreateCompetitionDTO,
  EditCompetitionDTO,
  RankingDTO,
} from '@opentour/contracts';

import {
  AddModeratorToCompetitionCommand,
  CreateCompetitionCommand,
  DeleteCompetitionCommand,
  GetCompetitionByNameQuery,
  GetCompetitionQuery,
  GetCompetitionsQuery,
  StartCompetitionCommand,
} from '../../application';
import { StartNextRoundOfCompetitionCommand } from '../../application/command/start-next-round-of-competition.command';
import { GetCompetitionRankingQuery } from '../../application/query/get-competition-ranking.query';
import { CompetitionMapper } from '../eventstore/competition.mapper';
import { RankingMapper } from '../eventstore/ranking.mapper';
import { CompetitionView } from '../read-model/schema/competition.schema';
import { RankingView } from '../read-model/schema/ranking.schema';

@Injectable()
export class CompetitionService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private competitionMapper: CompetitionMapper,
    private rankingMapper: RankingMapper
  ) {}

  async createCompetition(params: CreateCompetitionDTO) {
    const { id, name, sportName, type, moderatorId, scoreSystem } = params;
    return this.commandBus.execute(
      new CreateCompetitionCommand({
        id,
        name,
        sportName,
        type,
        moderatorId,
        scoreSystem,
      })
    );
  }

  async deleteCompetition(id: string) {
    return this.commandBus.execute(new DeleteCompetitionCommand(id));
  }

  async startCompetition(id: string): Promise<void> {
    return await this.commandBus.execute(new StartCompetitionCommand(id));
  }

  async nextRound(id: string): Promise<void> {
    return await this.commandBus.execute(
      new StartNextRoundOfCompetitionCommand(id)
    );
  }

  async getCompetition(id: string): Promise<CompetitionDTO | null> {
    const competition = await this.queryBus.execute<
      GetCompetitionQuery,
      CompetitionView
    >(new GetCompetitionQuery(id));
    return this.competitionMapper.viewToDto(competition);
  }

  async getCompetitions(): Promise<CompetitionDTO[]> {
    const competitions = await this.queryBus.execute<
      GetCompetitionsQuery,
      CompetitionView[]
    >(new GetCompetitionsQuery());
    return competitions.map(this.competitionMapper.viewToDto);
  }

  async getCompetitionByName(name: string): Promise<CompetitionDTO | null> {
    const competition = await this.queryBus.execute<
      GetCompetitionByNameQuery,
      CompetitionView
    >(new GetCompetitionByNameQuery(name));
    return this.competitionMapper.viewToDto(competition);
  }

  async getCompetitionRanking(id: string): Promise<RankingDTO | null> {
    const ranking = await this.queryBus.execute<
      GetCompetitionRankingQuery,
      RankingView
    >(new GetCompetitionRankingQuery(id));
    return this.rankingMapper.viewToDto(ranking);
  }

  async addModerator(id: string, moderatorEmail: string): Promise<void> {
    return this.commandBus.execute(
      new AddModeratorToCompetitionCommand(id, moderatorEmail)
    );
  }
}
