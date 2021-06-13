import { StorableEvent } from 'event-sourcing-nestjs';

export class TeamWasDeleted extends StorableEvent {
  eventAggregate = 'team';
  eventVersion = 1;

  constructor(readonly id: string) {
    super();
  }
}
