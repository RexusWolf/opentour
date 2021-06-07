import { Provider } from '@nestjs/common';

import { COMPETITIONS } from '../domain/repository';
import { CompetitionEventStore } from './eventstore/competitions.event-store';

export const competitionProviders: Provider[] = [
  {
    provide: COMPETITIONS,
    useClass: CompetitionEventStore,
  },
];
