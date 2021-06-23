import { Provider } from '@nestjs/common';
import { Connection } from 'mongoose';

import { DATABASE_CONNECTION } from '../../common/database/database.provider';
import {
  RANKING_MODEL,
  RankingSchema,
} from '../../competition/infrastructure/read-model/schema/ranking.schema';
import {
  TEAM_MODEL,
  TeamSchema,
} from '../../team/infrastructure/read-model/schema/team.schema';
import { MATCHES } from '../domain';
import { MatchMapper } from './eventstore/match.mapper';
import { MatchEventStore } from './eventstore/matches.event-store';
import { MATCH_MODEL, MatchSchema } from './read-model/schema/match.schema';

export const MatchProviders: Provider[] = [
  {
    provide: MATCH_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Match', MatchSchema),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: TEAM_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Team', TeamSchema),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: RANKING_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Ranking', RankingSchema),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: MATCHES,
    useClass: MatchEventStore,
  },
  {
    provide: MatchMapper,
    useClass: MatchMapper,
  },
];
