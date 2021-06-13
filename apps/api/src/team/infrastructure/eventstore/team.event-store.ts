import { Injectable } from '@nestjs/common';
import { EventStore, StoreEventPublisher } from 'event-sourcing-nestjs';

import { Team, TeamId } from '../../domain/model';
import { Teams } from '../../domain/repository';

@Injectable()
export class TeamEventStore implements Teams {
  constructor(
    private readonly eventStore: EventStore,
    private readonly publisher: StoreEventPublisher
  ) {}

  async find(teamId: TeamId): Promise<Team | null> {
    const events = await this.eventStore.getEvents('team', teamId.value);

    if (events.length === 0) {
      return null;
    }

    const team = Reflect.construct(Team, []);
    team.loadFromHistory(events);

    return team;
  }

  save(team: Team): void {
    team = this.publisher.mergeObjectContext(team);
    team.commit();
  }
}
