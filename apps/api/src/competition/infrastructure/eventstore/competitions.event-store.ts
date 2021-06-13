import { Injectable } from '@nestjs/common';
import { EventStore, StoreEventPublisher } from 'event-sourcing-nestjs';

import { Competition, CompetitionId } from '../../domain/model';
import { Competitions } from '../../domain/repository';

@Injectable()
export class CompetitionEventStore implements Competitions {
  constructor(
    private readonly eventStore: EventStore,
    private readonly publisher: StoreEventPublisher
  ) {}

  async find(competitionId: CompetitionId): Promise<Competition | null> {
    const events = await this.eventStore.getEvents(
      'competition',
      competitionId.value
    );

    if (events.length === 0) {
      return null;
    }

    const competition = Reflect.construct(Competition, []);
    competition.loadFromHistory(events);

    return competition;
  }

  save(competition: Competition): void {
    competition = this.publisher.mergeObjectContext(competition);
    competition.commit();
  }
}
