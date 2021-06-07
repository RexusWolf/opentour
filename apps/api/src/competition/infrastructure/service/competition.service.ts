import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Model } from 'mongoose';

import {
  CreateCompetitionCommand,
  DeleteCompetitionCommand,
  UpdateCompetitionCommand,
} from '../../application';
import {
  COMPETITION_MODEL,
  CompetitionView,
} from '../read-model/schema/competition.schema';

@Injectable()
export class CompetitionService {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(COMPETITION_MODEL)
    private readonly competitionModel: Model<CompetitionView>
  ) {}

  async createCompetition(params: {
    id: string;
    name: string;
    sportId: string;
    type: string;
    moderatorId: string;
  }) {
    const { id, name, sportId, type, moderatorId } = params;
    return this.commandBus.execute(
      new CreateCompetitionCommand({ id, name, sportId, type, moderatorId })
    );
  }

  async deleteCompetition(id: string) {
    return this.commandBus.execute(new DeleteCompetitionCommand(id));
  }

  async updateCompetition(params: {
    id: string;
    name: string;
    moderatorIds: string[];
  }): Promise<void> {
    const { id, name, moderatorIds } = params;
    return this.commandBus.execute(
      new UpdateCompetitionCommand({ id, name, moderatorIds })
    );
  }

  async getCompetition(id: string): Promise<CompetitionView | null> {
    return this.competitionModel.findById(id).exec();
  }

  async getCompetitions(): Promise<CompetitionView[]> {
    return this.competitionModel.find().exec();
  }

  async getCompetitionByName(name: string): Promise<CompetitionView | null> {
    return this.competitionModel.findOne({ name: name }).exec();
  }
}
