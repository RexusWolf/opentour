import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingModule } from 'event-sourcing-nestjs';

import { DatabaseModule } from '../../common/database/database.module';
import {
  CreateTeamHandler,
  DeleteTeamHandler,
  GetTeamHandler,
  GetTeamsHandler,
  UpdateTeamHandler,
} from '../application';
import { GetTeamsByCompetitionIdHandler } from '../application/query/get-teams-by-competition-id.handler';
import { TeamController } from './controller/team.controller';
import { TeamWasCreatedProjection } from './read-model/projection/team-was-created.projection';
import { TeamWasDeletedProjection } from './read-model/projection/team-was-deleted.projection';
import { TeamService } from './service/team.service';
import { TeamProviders } from './team.providers';

const CommandHandlers = [
  CreateTeamHandler,
  DeleteTeamHandler,
  UpdateTeamHandler,
];
const QueryHandlers = [
  GetTeamsByCompetitionIdHandler,
  GetTeamHandler,
  GetTeamsHandler,
];

const ProjectionHandlers = [TeamWasCreatedProjection, TeamWasDeletedProjection];

@Module({
  controllers: [TeamController],
  imports: [DatabaseModule, CqrsModule, EventSourcingModule.forFeature()],
  providers: [
    ...ProjectionHandlers,
    ...TeamProviders,
    ...CommandHandlers,
    ...QueryHandlers,
    TeamService,
  ],
})
export class TeamModule {}
