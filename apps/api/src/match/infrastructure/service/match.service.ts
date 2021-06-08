import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MatchDTO } from '@opentour/contracts';

import {
  CreateMatchCommand,
  DeleteMatchCommand,
  GetMatchesByCompetitionIdQuery,
  GetMatchesQuery,
  GetMatchQuery,
  UpdateMatchCommand,
} from '../../application';
import { MatchResult } from '../../domain';
import { MatchMapper } from '../eventstore/match.mapper';

@Injectable()
export class MatchService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly matchMapper: MatchMapper
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

  async getMatch(id: string): Promise<MatchDTO | null> {
    const match = await this.queryBus.execute(new GetMatchQuery(id));
    return this.matchMapper.viewToDto(match);
  }

  async getMatches(): Promise<MatchDTO[]> {
    const matches = await this.queryBus.execute(new GetMatchesQuery());
    return matches.map(this.matchMapper.viewToDto);
  }

  async getMatchByCompetitionId(
    competitionId: string
  ): Promise<MatchDTO | null> {
    const match = await this.queryBus.execute(
      new GetMatchesByCompetitionIdQuery(competitionId)
    );
    return this.matchMapper.viewToDto(match);
  }
}
