import { Provider } from '@nestjs/common';
import { Connection } from 'mongoose';

import { DATABASE_CONNECTION } from '../../common/database/database.provider';
import {
  MATCH_MODEL,
  MatchSchema,
} from '../../match/infrastructure/read-model/schema/match.schema';
import {
  TEAM_MODEL,
  TeamSchema,
} from '../../team/infrastructure/read-model/schema/team.schema';
import { USERS } from '../../user/domain';
import { UserRepository } from '../../user/infrastructure/repository/user.repository';
import { COMPETITIONS } from '../domain';
import { CompetitionMapper } from './eventstore/competition.mapper';
import { CompetitionEventStore } from './eventstore/competitions.event-store';
import { RankingMapper } from './eventstore/ranking.mapper';
import {
  COMPETITION_MODEL,
  CompetitionSchema,
} from './read-model/schema/competition.schema';
import {
  RANKING_MODEL,
  RankingSchema,
} from './read-model/schema/ranking.schema';

export const competitionProviders: Provider[] = [
  {
    provide: COMPETITION_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Competition', CompetitionSchema),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: COMPETITIONS,
    useClass: CompetitionEventStore,
  },
  {
    provide: CompetitionMapper,
    useClass: CompetitionMapper,
  },
  {
    provide: RANKING_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Ranking', RankingSchema),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: RankingMapper,
    useClass: RankingMapper,
  },
  {
    provide: TEAM_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Team', TeamSchema),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: MATCH_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Match', MatchSchema),
    inject: [DATABASE_CONNECTION],
  },
];
