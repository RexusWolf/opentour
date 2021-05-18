import { Injectable } from '@nestjs/common';

import { CompetitionId } from '../../../competition/domain/model';
import { TeamId } from '../../../team/domain/model';
import { Match, MatchId, MatchIndex, MatchJourney } from '../../domain';
import { MatchEntity } from '../entity/match.entity';

@Injectable()
export class MatchMapper {
  entityToAggregate(matchEntity: MatchEntity): Match {
    const {
      id,
      competitionId,
      index,
      journey,
      localTeamId,
      visitorTeamId,
      date,
      result,
    } = matchEntity;

    const match: Match = Reflect.construct(Match, []);
    Reflect.set(match, '_matchId', MatchId.fromString(id));
    Reflect.set(
      match,
      '_competitionId',
      CompetitionId.fromString(competitionId)
    );
    Reflect.set(match, '_index', MatchIndex.fromNumber(index));
    Reflect.set(match, '_journey', MatchJourney.fromString(journey));
    Reflect.set(match, '_localTeamId', TeamId.fromString(localTeamId));
    Reflect.set(match, '_visitorTeamId', TeamId.fromString(visitorTeamId));
    Reflect.set(match, '_date', date);
    Reflect.set(match, '_result', result);

    return match;
  }

  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  aggregateToEntity(match: Match): MatchEntity {
    return new MatchEntity(
      match.id.value,
      match.competitionId.value,
      match.index.value,
      match.journey.value,
      match.localTeamId!.value,
      match.visitorTeamId!.value,
      match.date!,
      match.result!
    );
  }
}
