import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TeamDTO } from '@opentour/contracts';

import { CompetitionId } from '../../../competition/domain/model';
import { TEAMS, Teams } from '../../domain/repository';
import { TeamMapper } from '../../infrastructure/repository/team.mapper';
import { GetTeamsByCompetitionIdQuery } from './get-teams-by-competition-id.query';

@QueryHandler(GetTeamsByCompetitionIdQuery)
export class GetTeamsByCompetitionIdHandler
  implements IQueryHandler<GetTeamsByCompetitionIdQuery> {
  constructor(
    @Inject(TEAMS) private teams: Teams,
    private teamMapper: TeamMapper
  ) {}

  async execute(
    query: GetTeamsByCompetitionIdQuery
  ): Promise<TeamDTO[] | null> {
    const teams = await this.teams.findAllByCompetition(
      CompetitionId.fromString(query.competitionId)
    );

    if (!teams) {
      return null;
    }

    return teams.map((match) => this.teamMapper.aggregateToEntity(match));
  }
}
