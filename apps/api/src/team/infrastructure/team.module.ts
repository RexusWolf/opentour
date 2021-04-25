import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../../auth/auth.module';
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
import { TeamEntity } from './entity/team.entity';
import { TeamMapper } from './repository/team.mapper';
import { TeamWasDeletedSaga } from './saga/team-was-deleted.saga';
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
const Sagas = [TeamWasDeletedSaga];

@Module({
  controllers: [TeamController],
  imports: [AuthModule, CqrsModule, TypeOrmModule.forFeature([TeamEntity])],
  providers: [
    ...teamProviders,
    ...CommandHandlers,
    ...QueryHandlers,
    ...Sagas,
    TeamMapper,
  ],
})
export class TeamModule {}
