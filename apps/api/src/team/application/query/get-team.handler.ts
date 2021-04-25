import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TeamDTO } from '@opentour/contracts';

import { TeamId } from '../../domain/model';
import { TEAMS, Teams } from '../../domain/repository/teams';
import { TeamMapper } from '../../infrastructure/repository/team.mapper';
import { GetTeamQuery } from './get-team.query';

@QueryHandler(GetTeamQuery)
export class GetTeamHandler implements IQueryHandler<GetTeamQuery> {
  constructor(
    @Inject(TEAMS) private teams: Teams,
    private teamMapper: TeamMapper
  ) {}

  async execute(query: GetTeamQuery): Promise<TeamDTO | null> {
    const team = await this.teams.find(TeamId.fromString(query.id));

    if (!team) {
      return null;
    }

    return this.teamMapper.aggregateToEntity(team);
  }
}
