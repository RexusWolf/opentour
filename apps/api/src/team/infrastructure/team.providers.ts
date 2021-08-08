import { Provider } from '@nestjs/common';
import { Connection } from 'mongoose';

import { DATABASE_CONNECTION } from '../../common/database/database.provider';
import { COMPETITIONS } from '../../competition/domain';
import { CompetitionEventStore } from '../../competition/infrastructure/eventstore/competitions.event-store';
import { TEAMS } from '../domain';
import { TeamEventStore } from './eventstore/team.event-store';
import { TeamMapper } from './eventstore/team.mapper';
import { TEAM_MODEL, TeamSchema } from './read-model/schema/team.schema';

export const TeamProviders: Provider[] = [
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
  {
    provide: COMPETITIONS,
    useClass: CompetitionEventStore,
  },
  {
    provide: TeamMapper,
    useClass: TeamMapper,
  },
];
