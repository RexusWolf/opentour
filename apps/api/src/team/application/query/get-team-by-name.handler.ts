import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';

import {
  TEAM_MODEL,
  TeamView,
} from '../../infrastructure/read-model/schema/team.schema';
import { GetTeamByNameQuery } from '.';

@QueryHandler(GetTeamByNameQuery)
export class GetTeamByNameHandler implements IQueryHandler<GetTeamByNameQuery> {
  constructor(@Inject(TEAM_MODEL) private teamModel: Model<TeamView>) {}

  async execute(query: GetTeamByNameQuery): Promise<TeamView | null> {
    return await this.teamModel.findOne({ name: query.name });
  }
}
