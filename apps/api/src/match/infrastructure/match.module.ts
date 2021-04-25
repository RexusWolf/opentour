import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../../auth/auth.module';
import {
  CreateMatchHandler,
  DeleteMatchHandler,
  GetMatchesByCompetitionIdHandler,
  GetMatchesHandler,
  GetMatchHandler,
  UpdateMatchHandler,
} from '../application';
import { MatchController } from './controller/match.controller';
import { MatchEntity } from './entity/match.entity';
import { matchProviders } from './match.providers';
import { MatchMapper } from './repository/match.mapper';
import { MatchWasDeletedSaga } from './saga/match-was-deleted.saga';

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
const Sagas = [MatchWasDeletedSaga];

@Module({
  controllers: [MatchController],
  imports: [AuthModule, CqrsModule, TypeOrmModule.forFeature([MatchEntity])],
  providers: [
    ...matchProviders,
    ...CommandHandlers,
    ...QueryHandlers,
    ...Sagas,
    MatchMapper,
  ],
})
export class MatchModule {}
