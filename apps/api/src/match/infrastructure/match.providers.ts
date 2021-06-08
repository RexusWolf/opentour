import { Provider } from '@nestjs/common';
import { Connection } from 'mongoose';

import { DATABASE_CONNECTION } from '../../common/database/database.provider';
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
    provide: MATCHES,
    useClass: MatchEventStore,
  },
  {
    provide: MatchMapper,
    useClass: MatchMapper,
  },
];
