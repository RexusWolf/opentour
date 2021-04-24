import { Provider } from '@nestjs/common';

import { COMPETITIONS } from '../domain/repository';
import { CompetitionRepository } from './repository/competition.repository';

export const competitionProviders: Provider[] = [
  {
    provide: COMPETITIONS,
    useClass: CompetitionRepository,
  },
];
