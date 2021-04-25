import { Provider } from '@nestjs/common';

import { MATCHES } from '../domain/repository';
import { MatchRepository } from './repository/match.repository';

export const matchProviders: Provider[] = [
  {
    provide: MATCHES,
    useClass: MatchRepository,
  },
];
