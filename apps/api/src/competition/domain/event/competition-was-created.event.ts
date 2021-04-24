import { StorableEvent } from 'event-sourcing-nestjs';

export class CompetitionWasCreated extends StorableEvent {
  eventAggregate = 'competition';
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly type: string,
    public readonly sportId: string
  ) {
    super();
  }
}
