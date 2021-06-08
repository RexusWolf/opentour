import { Provider } from '@nestjs/common';
import { Connection } from 'mongoose';

import { DATABASE_CONNECTION } from '../../common/database/database.provider';
import { MATCHES } from '../domain';
import { MatchEventStore } from './eventstore/matches.event-store';
import { MatchSchema, MATCH_MODEL } from './read-model/schema/match.schema';

export const matchProviders: Provider[] = [
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
];
