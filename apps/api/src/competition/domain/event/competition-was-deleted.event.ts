import { StorableEvent } from 'event-sourcing-nestjs';

export class CompetitionWasDeleted extends StorableEvent {
  eventAggregate = 'competition';
  eventVersion = 1;
  readonly createdOn = new Date();

  constructor(readonly id: string) {
    super();
  }
}
