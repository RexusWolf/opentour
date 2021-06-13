import { StorableEvent } from 'event-sourcing-nestjs';

export class CompetitionWasUpdated extends StorableEvent {
  eventAggregate = 'competition';
  eventVersion = 1;

  constructor(
    readonly id: string,
    readonly name: string,
    readonly moderatorIds: string[]
  ) {
    super();
  }
}
