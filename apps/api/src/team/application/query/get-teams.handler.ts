import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';

import {
  TEAM_MODEL,
  TeamView,
} from '../../infrastructure/read-model/schema/team.schema';
import { GetTeamsQuery } from './get-teams.query';

@QueryHandler(GetTeamsQuery)
export class GetTeamsHandler implements IQueryHandler<GetTeamsQuery> {
  constructor(
    @Inject(TEAM_MODEL) private readonly teamModel: Model<TeamView>
  ) {}

  async execute(query: GetTeamsQuery): Promise<TeamView[]> {
    return await this.teamModel.find().exec();
  }
}
