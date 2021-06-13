import { StorableEvent } from 'event-sourcing-nestjs';

export class CompetitionWasCreated extends StorableEvent {
  eventAggregate = 'competition';
  eventVersion = 1;

  constructor(
    readonly id: string,
    readonly name: string,
    readonly type: string,
    readonly sportName: string,
    readonly moderatorId: string
  ) {
    super();
  }
}
