import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Model } from 'mongoose';

import {
  CreateMatchCommand,
  DeleteMatchCommand,
  UpdateMatchCommand,
} from '../../application';
import { MatchResult } from '../../domain';
import { MATCH_MODEL, MatchView } from '../read-model/schema/match.schema';

@Injectable()
export class MatchService {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(MATCH_MODEL)
    private readonly matchModel: Model<MatchView>
  ) {}

  async createMatch(params: {
    id: string;
    competitionId: string;
    index: number;
    journey: string;
  }) {
    const { id, competitionId, index, journey } = params;
    return this.commandBus.execute(
      new CreateMatchCommand({ id, competitionId, index, journey })
    );
  }

  async deleteMatch(id: string) {
    return this.commandBus.execute(new DeleteMatchCommand(id));
  }

  async updateMatch(params: {
    id: string;
    localTeamId: string;
    visitorTeamId: string;
    date: Date;
    result: { localTeamScore: number; visitorTeamScore: number };
  }): Promise<void> {
    const { id, localTeamId, visitorTeamId, date, result } = params;
    return this.commandBus.execute(
      new UpdateMatchCommand({
        id,
        localTeamId,
        visitorTeamId,
        date,
        result: MatchResult.fromTeamScore(
          result.localTeamScore,
          result.visitorTeamScore
        ),
      })
    );
  }

  async getMatch(id: string): Promise<MatchView | null> {
    return this.matchModel.findById(id).exec();
  }

  async getMatches(): Promise<MatchView[]> {
    return this.matchModel.find().exec();
  }

  async getMatchByName(name: string): Promise<MatchView | null> {
    return this.matchModel.findOne({ name: name }).exec();
  }
}
