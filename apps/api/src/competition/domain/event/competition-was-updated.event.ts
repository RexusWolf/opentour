import { StorableEvent } from 'event-sourcing-nestjs';

export class CompetitionWasUpdated extends StorableEvent {
  eventAggregate = 'competition';
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly moderatorIds: string[]
  ) {
    super();
  }
}
