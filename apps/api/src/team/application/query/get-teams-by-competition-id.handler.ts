import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';
import {
  TeamView,
  TEAM_MODEL,
} from '../../infrastructure/read-model/schema/team.schema';
import { GetTeamsByCompetitionIdQuery } from './get-teams-by-competition-id.query';

@QueryHandler(GetTeamsByCompetitionIdQuery)
export class GetTeamsByCompetitionIdHandler
  implements IQueryHandler<GetTeamsByCompetitionIdQuery> {
  constructor(@Inject(TEAM_MODEL) private teamModel: Model<TeamView>) {}
  async execute(
    query: GetTeamsByCompetitionIdQuery
  ): Promise<TeamView[] | null> {
    return await this.teamModel.find({ competitionId: query.competitionId });
  }
}
