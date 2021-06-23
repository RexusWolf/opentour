import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingModule } from 'event-sourcing-nestjs';

import { DatabaseModule } from '../../common/database/database.module';
import {
  CreateMatchHandler,
  DeleteMatchHandler,
  GetMatchesByCompetitionIdHandler,
  GetMatchesHandler,
  GetMatchHandler,
  UpdateMatchHandler,
} from '../application';
import { MatchController } from './controller/match.controller';
import { MatchEventStore } from './eventstore/matches.event-store';
import { MatchProviders } from './match.providers';
import { ProjectionHandlers } from './read-model/projection';
import { MatchService } from './service/match.service';

const CommandHandlers = [
  CreateMatchHandler,
  DeleteMatchHandler,
  UpdateMatchHandler,
];
const QueryHandlers = [
  GetMatchesByCompetitionIdHandler,
  GetMatchHandler,
  GetMatchesHandler,
];

@Module({
  controllers: [MatchController],
  imports: [DatabaseModule, CqrsModule, EventSourcingModule.forFeature()],
  providers: [
    ...MatchProviders,
    ...ProjectionHandlers,
    ...CommandHandlers,
    ...QueryHandlers,
    MatchService,
    MatchEventStore,
  ],
})
export class MatchModule {}
