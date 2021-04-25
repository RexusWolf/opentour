import { Provider } from '@nestjs/common';

import { TEAMS } from '../domain/repository';
import { TeamRepository } from './repository/team.repository';

export const teamProviders: Provider[] = [
  {
    provide: TEAMS,
    useClass: TeamRepository,
  },
];
