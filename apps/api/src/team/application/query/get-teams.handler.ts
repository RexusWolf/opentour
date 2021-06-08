import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';
import {
  TeamView,
  TEAM_MODEL,
} from '../../infrastructure/read-model/schema/team.schema';
import { GetTeamsQuery } from './get-teams.query';

@QueryHandler(GetTeamsQuery)
export class GetTeamsHandler implements IQueryHandler<GetTeamsQuery> {
  constructor(@Inject(TEAM_MODEL) private teamModel: Model<TeamView>) {}

  async execute(query: GetTeamsQuery): Promise<TeamView[] | null> {
    return await this.teamModel.find();
  }
}
