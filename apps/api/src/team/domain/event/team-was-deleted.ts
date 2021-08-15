import { StorableEvent } from 'event-sourcing-nestjs';

export class TeamWasDeleted extends StorableEvent {
  eventAggregate = 'team';
  eventVersion = 1;
  readonly createdOn = new Date();

  constructor(readonly id: string) {
    super();
  }
}
