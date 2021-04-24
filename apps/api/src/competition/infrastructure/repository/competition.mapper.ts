import { Injectable } from '@nestjs/common';

import { SportId } from '../../../sport/domain/model/sport-id';
import { UserId } from '../../../user/domain';
import {
  Competition,
  CompetitionName,
  CompetitionType,
} from '../../domain/model';
import { CompetitionEntity } from '../entity/competition.entity';

@Injectable()
export class CompetitionMapper {
  entityToAggregate(competitionEntity: CompetitionEntity): Competition {
    const { id, name, type, sportId, moderatorIds } = competitionEntity;

    const competition: Competition = Reflect.construct(Competition, []);
    Reflect.set(competition, '_competitionId', UserId.fromString(id));
    Reflect.set(competition, '_name', CompetitionName.fromString(name));
    Reflect.set(competition, '_type', CompetitionType.fromString(type));
    Reflect.set(competition, '_sportId', SportId.fromString(sportId));
    Reflect.set(
      competition,
      '_moderators',
      moderatorIds.map((userId: string) => UserId.fromString(userId))
    );

    return competition;
  }

  aggregateToEntity(competition: Competition): CompetitionEntity {
    return new CompetitionEntity(
      competition.id.value,
      competition.name.value,
      competition.type.value,
      competition.sportId.value,
      competition.moderatorIds.map((userId: UserId) => userId.value)
    );
  }
}
