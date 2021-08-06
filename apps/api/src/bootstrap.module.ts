import { Module } from '@nestjs/common';
import { EventSourcingModule } from 'event-sourcing-nestjs';
import { AccessControlModule } from 'nest-access-control';
import { acl } from './app.acl';

import { DatabaseModule } from './common/database/database.module';
// eslint-disable @typescript-eslint/no-non-null-assertion

@Module({
  imports: [
    EventSourcingModule.forRoot({
      mongoURL: process.env.NODE_EVENTSOURCING_URI!,
    }),
    DatabaseModule,
    AccessControlModule.forRoles(acl),
  ],
})
export class BootstrapModule {}
