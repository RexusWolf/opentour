import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';

import {
  TeamView,
  TEAM_MODEL,
} from '../../infrastructure/read-model/schema/team.schema';
import { GetTeamQuery } from './get-team.query';

@QueryHandler(GetTeamQuery)
export class GetTeamHandler implements IQueryHandler<GetTeamQuery> {
  constructor(@Inject(TEAM_MODEL) private teamModel: Model<TeamView>) {}

  async execute(query: GetTeamQuery): Promise<TeamView | null> {
    return await this.teamModel.findOne({ id: query.id });
  }
}
