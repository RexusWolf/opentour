import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Model } from 'mongoose';

import { CreateTeamCommand, DeleteTeamCommand } from '../../application';
import { TEAM_MODEL, TeamView } from '../read-model/schema/team.schema';

@Injectable()
export class TeamService {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(TEAM_MODEL)
    private readonly teamModel: Model<TeamView>
  ) {}

  async createTeam(params: {
    id: string;
    competitionId: string;
    name: string;
    captainId: string;
  }) {
    const { id, competitionId, name, captainId } = params;
    return this.commandBus.execute(
      new CreateTeamCommand({ id, competitionId, name, captainId })
    );
  }

  async deleteTeam(id: string) {
    return this.commandBus.execute(new DeleteTeamCommand(id));
  }

  async getTeam(id: string): Promise<TeamView | null> {
    return this.teamModel.findById(id).exec();
  }

  async getTeams(): Promise<TeamView[]> {
    return this.teamModel.find().exec();
  }

  async getTeamByName(name: string): Promise<TeamView | null> {
    return this.teamModel.findOne({ name: name }).exec();
  }
}
