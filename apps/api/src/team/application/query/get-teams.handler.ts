import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TeamDTO } from '@opentour/contracts';

import { TEAMS, Teams } from '../../domain/repository';
import { TeamMapper } from '../../infrastructure/repository/team.mapper';
import { GetTeamsQuery } from './get-teams.query';

@QueryHandler(GetTeamsQuery)
export class GetTeamsHandler implements IQueryHandler<GetTeamsQuery> {
  constructor(
    @Inject(TEAMS) private teams: Teams,
    private teamMapper: TeamMapper
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetTeamsQuery): Promise<TeamDTO[] | null> {
    const teams = await this.teams.findAll();

    return teams.map(this.teamMapper.aggregateToEntity);
  }
}
