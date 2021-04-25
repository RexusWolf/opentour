import { Injectable } from '@nestjs/common';

import { CompetitionId } from '../../../competition/domain/model';
import { UserId } from '../../../user/domain';
import { Team, TeamName } from '../../domain/model';
import { TeamEntity } from '../entity/team.entity';

@Injectable()
export class TeamMapper {
  entityToAggregate(teamEntity: TeamEntity): Team {
    const { id, competitionId, name, captainId, membersIds } = teamEntity;

    const team: Team = Reflect.construct(Team, []);
    Reflect.set(team, '_teamId', UserId.fromString(id));
    Reflect.set(
      team,
      '_competitionId',
      CompetitionId.fromString(competitionId)
    );
    Reflect.set(team, '_name', TeamName.fromString(name));
    Reflect.set(team, '_captainId', UserId.fromString(captainId));
    Reflect.set(
      team,
      '_membersIds',
      membersIds.map((userId: string) => UserId.fromString(userId))
    );

    return team;
  }

  aggregateToEntity(team: Team): TeamEntity {
    return new TeamEntity(
      team.id.value,
      team.competitionId.value,
      team.name.value,
      team.captainId.value,
      team.membersIds.map((userId: UserId) => userId.value)
    );
  }
}
