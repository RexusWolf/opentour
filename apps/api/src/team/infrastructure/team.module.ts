import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingModule } from 'event-sourcing-nestjs';

import { DatabaseModule } from '../../common/database/database.module';
import {
  CreateTeamHandler,
  DeleteTeamHandler,
  GetTeamByNameHandler,
  GetTeamHandler,
  GetTeamsHandler,
  UpdateTeamHandler,
} from '../application';
import { GetTeamsByCompetitionIdHandler } from '../application/query/get-teams-by-competition-id.handler';
import { TeamController } from './controller/team.controller';
import { TeamEventStore } from './eventstore/team.event-store';
import { TeamService } from './service/team.service';
import { teamProviders } from './team.providers';

const CommandHandlers = [
  CreateTeamHandler,
  DeleteTeamHandler,
  UpdateTeamHandler,
];
const QueryHandlers = [
  GetTeamByNameHandler,
  GetTeamsByCompetitionIdHandler,
  GetTeamHandler,
  GetTeamsHandler,
];

@Module({
  controllers: [TeamController],
  imports: [DatabaseModule, CqrsModule, EventSourcingModule.forFeature()],
  providers: [
    ...teamProviders,
    ...CommandHandlers,
    ...QueryHandlers,
    TeamService,
    TeamEventStore,
  ],
})
export class TeamModule {}
