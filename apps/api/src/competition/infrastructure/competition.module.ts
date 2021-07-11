import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingModule } from 'event-sourcing-nestjs';

import { DatabaseModule } from '../../common/database/database.module';
import { UserModule } from '../../user/infrastructure';
import {
  AddModeratorToCompetitionHandler,
  CreateCompetitionHandler,
  DeleteCompetitionHandler,
  GetCompetitionByNameHandler,
  GetCompetitionHandler,
  GetCompetitionsHandler,
  StartCompetitionHandler,
  UpdateCompetitionHandler,
} from '../application';
import { GetCompetitionRankingHandler } from '../application/query/get-competition-ranking.handler';
import { competitionProviders } from './competition.providers';
import { CompetitionController } from './controller/competition.controller';
import { CompetitionEventStore } from './eventstore/competitions.event-store';
import { ProjectionHandlers } from './read-model/projection';
import { CompetitionService } from './service/competition.service';

const CommandHandlers = [
  CreateCompetitionHandler,
  DeleteCompetitionHandler,
  UpdateCompetitionHandler,
  StartCompetitionHandler,
  AddModeratorToCompetitionHandler,
];
const QueryHandlers = [
  GetCompetitionByNameHandler,
  GetCompetitionRankingHandler,
  GetCompetitionHandler,
  GetCompetitionsHandler,
];

@Module({
  controllers: [CompetitionController],
  imports: [
    CqrsModule,
    DatabaseModule,
    UserModule,
    EventSourcingModule.forFeature(),
  ],
  providers: [
    ...competitionProviders,
    ...ProjectionHandlers,
    ...CommandHandlers,
    ...QueryHandlers,
    CompetitionService,
    CompetitionEventStore,
  ],
})
export class CompetitionModule {}
