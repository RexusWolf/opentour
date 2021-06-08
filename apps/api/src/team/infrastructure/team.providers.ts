import { Provider } from '@nestjs/common';
import { Connection } from 'mongoose';

import { DATABASE_CONNECTION } from '../../common/database/database.provider';
import { TEAMS } from '../domain/repository';
import { TeamEventStore } from './eventstore/team.event-store';
import { TEAM_MODEL,TeamSchema } from './read-model/schema/team.schema';

export const teamProviders: Provider[] = [
  {
    provide: TEAM_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Team', TeamSchema),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: TEAMS,
    useClass: TeamEventStore,
  },
];
