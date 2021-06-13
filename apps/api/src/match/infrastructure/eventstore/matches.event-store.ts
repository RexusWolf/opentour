import { Injectable } from '@nestjs/common';
import { EventStore, StoreEventPublisher } from 'event-sourcing-nestjs';

import { Match, Matches,MatchId  } from '../../domain';


@Injectable()
export class MatchEventStore implements Matches {
  constructor(
    private readonly eventStore: EventStore,
    private readonly publisher: StoreEventPublisher
  ) {}

  async find(matchId: MatchId): Promise<Match | null> {
    const events = await this.eventStore.getEvents('match', matchId.value);

    if (events.length === 0) {
      return null;
    }

    const match = Reflect.construct(Match, []);
    match.loadFromHistory(events);

    return match;
  }

  save(match: Match): void {
    match = this.publisher.mergeObjectContext(match);
    match.commit();
  }
}
