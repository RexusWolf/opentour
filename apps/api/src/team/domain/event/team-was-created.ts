import { StorableEvent } from 'event-sourcing-nestjs';

export class TeamWasCreated extends StorableEvent {
  eventAggregate = 'team';
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly competitionId: string,
    public readonly name: string,
    public readonly captainId: string
  ) {
    super();
  }
}
