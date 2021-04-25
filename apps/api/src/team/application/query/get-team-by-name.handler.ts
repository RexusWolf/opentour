import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TeamDTO } from '@opentour/contracts';

import { TeamName } from '../../domain/model';
import { TEAMS, Teams } from '../../domain/repository';
import { TeamMapper } from '../../infrastructure/repository/team.mapper';
import { GetTeamByNameQuery } from '.';

@QueryHandler(GetTeamByNameQuery)
export class GetTeamByNameHandler implements IQueryHandler<GetTeamByNameQuery> {
  constructor(
    @Inject(TEAMS) private teams: Teams,
    private teamMapper: TeamMapper
  ) {}

  async execute(query: GetTeamByNameQuery): Promise<TeamDTO | null> {
    const team = await this.teams.findOneByName(
      TeamName.fromString(query.name)
    );

    if (!team) {
      return null;
    }

    return this.teamMapper.aggregateToEntity(team);
  }
}
