import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTeamDTO, TeamDTO } from '@opentour/contracts';

import {
  CreateTeamCommand,
  DeleteTeamCommand,
  GetTeamQuery,
  GetTeamsQuery,
} from '../../application';
import { GetTeamsByCompetitionIdQuery } from '../../application/query/get-teams-by-competition-id.query';
import { TeamMapper } from '../eventstore/team.mapper';
import { TeamView } from '../read-model/schema/team.schema';

@Injectable()
export class TeamService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly teamMapper: TeamMapper
  ) {}

  async createTeam(params: { createTeamDto: CreateTeamDTO; userId: string }) {
    const { id, competitionId, name, logo } = params.createTeamDto;
    return this.commandBus.execute(
      new CreateTeamCommand(
        {
          id,
          competitionId,
          name,
          logo,
        },
        params.userId
      )
    );
  }

  async deleteTeam(id: string) {
    return this.commandBus.execute(new DeleteTeamCommand(id));
  }

  async getTeam(id: string): Promise<TeamDTO> {
    const team = await this.queryBus.execute<GetTeamQuery, TeamView>(
      new GetTeamQuery(id)
    );
    return this.teamMapper.viewToDto(team);
  }

  async getTeams(): Promise<TeamDTO[]> {
    const teams = await this.queryBus.execute<GetTeamsQuery, TeamView[]>(
      new GetTeamsQuery()
    );
    return teams.map(this.teamMapper.viewToDto);
  }

  async getTeamsByCompetitionId(competitionId: string): Promise<TeamDTO[]> {
    const teams = await this.queryBus.execute<
      GetTeamsByCompetitionIdQuery,
      TeamView[]
    >(new GetTeamsByCompetitionIdQuery(competitionId));
    return teams.map(this.teamMapper.viewToDto);
  }
}
