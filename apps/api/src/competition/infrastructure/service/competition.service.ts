import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CompetitionDTO } from '@opentour/contracts';

import {
  CreateCompetitionCommand,
  DeleteCompetitionCommand,
  GetCompetitionByNameQuery,
  GetCompetitionQuery,
  GetCompetitionsQuery,
  StartCompetitionCommand,
  UpdateCompetitionCommand,
} from '../../application';
import { CompetitionMapper } from '../eventstore/competition.mapper';
import { CompetitionView } from '../read-model/schema/competition.schema';

@Injectable()
export class CompetitionService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private competitionMapper: CompetitionMapper
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

  async updateCompetition(params: {
    id: string;
    name: string;
    moderatorIds: string[];
  }): Promise<void> {
    const { id, name, moderatorIds } = params;
    return this.commandBus.execute(
      new UpdateCompetitionCommand({ id, name, moderatorIds })
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
}
