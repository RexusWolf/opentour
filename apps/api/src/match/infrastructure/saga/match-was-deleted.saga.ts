import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MatchWasDeleted } from '../../domain/event';
import { MatchEntity } from '../entity/match.entity';

@EventsHandler(MatchWasDeleted)
export class MatchWasDeletedSaga implements IEventHandler<MatchWasDeleted> {
  constructor(
    @InjectRepository(MatchEntity)
    private matchRepository: Repository<MatchEntity>
  ) {}

  async handle(event: MatchWasDeleted) {
    const match = await this.matchRepository.findOne(event.id);

    if (!match) {
      return;
    }

    this.matchRepository.remove(match);
  }
}
