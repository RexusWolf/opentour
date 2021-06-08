import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTeamByNameQuery } from '.';
import {
  TeamView,
  TEAM_MODEL,
} from '../../infrastructure/read-model/schema/team.schema';
import { Model } from 'mongoose';

@QueryHandler(GetTeamByNameQuery)
export class GetTeamByNameHandler implements IQueryHandler<GetTeamByNameQuery> {
  constructor(@Inject(TEAM_MODEL) private teamModel: Model<TeamView>) {}

  async execute(query: GetTeamByNameQuery): Promise<TeamView | null> {
    return await this.teamModel.findOne({ name: query.name });
  }
}
