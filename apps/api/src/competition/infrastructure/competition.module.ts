import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../../auth/auth.module';
import {
  CreateCompetitionHandler,
  DeleteCompetitionHandler,
  GetCompetitionByNameHandler,
  GetCompetitionHandler,
  GetCompetitionsHandler,
  UpdateCompetitionHandler,
} from '../application';
import { competitionProviders } from './competition.providers';
import { CompetitionController } from './controller/competition.controller';
import { CompetitionEntity } from './entity/competition.entity';
import { CompetitionMapper } from './repository/competition.mapper';
import { CompetitionWasDeletedSaga } from './saga/competition-was-deleted.saga';

const CommandHandlers = [
  CreateCompetitionHandler,
  DeleteCompetitionHandler,
  UpdateCompetitionHandler,
];
const QueryHandlers = [
  GetCompetitionByNameHandler,
  GetCompetitionHandler,
  GetCompetitionsHandler,
];
const Sagas = [CompetitionWasDeletedSaga];

@Module({
  controllers: [CompetitionController],
  imports: [
    AuthModule,
    CqrsModule,
    TypeOrmModule.forFeature([CompetitionEntity]),
  ],
  providers: [
    ...competitionProviders,
    ...CommandHandlers,
    ...QueryHandlers,
    ...Sagas,
    CompetitionMapper,
  ],
})
export class CompetitionModule {}
