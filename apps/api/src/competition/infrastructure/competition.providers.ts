import { Provider } from '@nestjs/common';
import { Connection } from 'mongoose';

import { DATABASE_CONNECTION } from '../../common/database/database.provider';
import { COMPETITIONS } from '../domain/repository';
import { CompetitionMapper } from './eventstore/competition.mapper';
import { CompetitionEventStore } from './eventstore/competitions.event-store';
import {
  COMPETITION_MODEL,
  CompetitionSchema,
} from './read-model/schema/competition.schema';

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
];
