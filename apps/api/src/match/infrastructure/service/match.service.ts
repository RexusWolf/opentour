import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EditMatchDTO, MatchDTO } from '@opentour/contracts';

import {
  CreateMatchCommand,
  DeleteMatchCommand,
  GetMatchesByCompetitionIdQuery,
  GetMatchesQuery,
  GetMatchQuery,
  UpdateMatchCommand,
} from '../../application';
import { MatchMapper } from '../eventstore/match.mapper';
import { MatchView } from '../read-model/schema/match.schema';

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
    localTeamId?: string;
    visitorTeamId?: string;
    index: number;
    journey: string;
  }) {
    const { id, competitionId, localTeamId, visitorTeamId, index, journey } =
      params;
    return this.commandBus.execute(
      new CreateMatchCommand({
        id,
        competitionId,
        localTeamId,
        visitorTeamId,
        index,
        journey,
      })
    );
  }

  async deleteMatch(id: string) {
    return await this.commandBus.execute(new DeleteMatchCommand(id));
  }

  async updateMatch(id: string, editMatchDTO: EditMatchDTO): Promise<void> {
    return this.commandBus.execute(new UpdateMatchCommand(id, editMatchDTO));
  }

  async getMatch(id: string): Promise<MatchDTO | null> {
    const match = await this.queryBus.execute<GetMatchQuery, MatchView>(
      new GetMatchQuery(id)
    );
    return this.matchMapper.viewToDto(match);
  }

  async getMatches(): Promise<MatchDTO[]> {
    const matches = await this.queryBus.execute(new GetMatchesQuery());
    return matches.map(this.matchMapper.viewToDto);
  }

  async getMatchesByCompetitionId(competitionId: string): Promise<MatchDTO[]> {
    const matches = await this.queryBus.execute<
      GetMatchesByCompetitionIdQuery,
      MatchView[]
    >(new GetMatchesByCompetitionIdQuery(competitionId));
    return matches.map(this.matchMapper.viewToDto);
  }
}
