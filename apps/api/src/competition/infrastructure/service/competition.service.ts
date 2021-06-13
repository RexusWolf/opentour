import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CompetitionDTO,
  EditCompetitionDTO,
  RankingDTO,
} from '@opentour/contracts';

import {
  CreateCompetitionCommand,
  DeleteCompetitionCommand,
  GetCompetitionByNameQuery,
  GetCompetitionQuery,
  GetCompetitionsQuery,
  StartCompetitionCommand,
  UpdateCompetitionCommand,
} from '../../application';
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

  async createCompetition(params: {
    id: string;
    name: string;
    sportName: string;
    type: string;
    moderatorId: string;
  }) {
    const { id, name, sportName, type, moderatorId } = params;
    return this.commandBus.execute(
      new CreateCompetitionCommand({ id, name, sportName, type, moderatorId })
    );
  }

  async deleteCompetition(id: string) {
    return this.commandBus.execute(new DeleteCompetitionCommand(id));
  }

  async updateCompetition(
    id: string,
    editCompetitionDTO: EditCompetitionDTO
  ): Promise<void> {
    const { name, moderatorIds } = editCompetitionDTO;
    return this.commandBus.execute(
      new UpdateCompetitionCommand(id, { name, moderatorIds })
    );
  }

  async startCompetition(id: string): Promise<void> {
    return await this.commandBus.execute(new StartCompetitionCommand(id));
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
}
