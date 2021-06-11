import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TeamDTO } from '@opentour/contracts';

import {
  CreateTeamCommand,
  DeleteTeamCommand,
  GetTeamByNameQuery,
  GetTeamQuery,
  GetTeamsQuery,
} from '../../application';
import { TeamMapper } from '../eventstore/team.mapper';
import { TeamView } from '../read-model/schema/team.schema';

@Injectable()
export class TeamService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly teamMapper: TeamMapper
  ) {}

  async createTeam(params: {
    id: string;
    competitionId: string;
    name: string;
    captainId: string;
  }) {
    const { id, competitionId, name, captainId } = params;
    return this.commandBus.execute(
      new CreateTeamCommand({ id, competitionId, name, captainId })
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

  async getTeamByName(name: string): Promise<TeamDTO> {
    const team = await this.queryBus.execute<GetTeamByNameQuery, TeamView>(
      new GetTeamByNameQuery(name)
    );
    return this.teamMapper.viewToDto(team);
  }
}
