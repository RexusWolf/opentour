import { StorableEvent } from 'event-sourcing-nestjs';

export class CompetitionWasDeleted extends StorableEvent {
  eventAggregate = 'competition';
  eventVersion = 1;
  public readonly createdOn = new Date();

  constructor(public readonly id: string) {
    super();
  }
}
