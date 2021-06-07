import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventSourcingModule } from 'event-sourcing-nestjs';

import { RolesGuard } from './auth/security/roles.guard';
import { DatabaseModule } from './common/database/database.module';
import { configService } from './config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    EventSourcingModule.forRoot({
      mongoURL: process.env.NODE_EVENTSOURCING_URI!,
    }),
    DatabaseModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class BootstrapModule {}
