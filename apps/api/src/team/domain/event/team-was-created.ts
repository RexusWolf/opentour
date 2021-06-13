import { StorableEvent } from 'event-sourcing-nestjs';

export class TeamWasCreated extends StorableEvent {
  eventAggregate = 'team';
  eventVersion = 1;

  constructor(
    readonly id: string,
    readonly competitionId: string,
    readonly name: string,
    readonly captainId: string
  ) {
    super();
  }
}
