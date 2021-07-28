import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { EventSourcingModule } from 'event-sourcing-nestjs';

import { RolesGuard } from './auth/security/roles.guard';
import { DatabaseModule } from './common/database/database.module';
// eslint-disable @typescript-eslint/no-non-null-assertion

@Module({
  imports: [
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
