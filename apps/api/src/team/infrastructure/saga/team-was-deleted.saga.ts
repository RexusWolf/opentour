import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TeamWasDeleted } from '../../domain/event';
import { TeamEntity } from '../entity/team.entity';

@EventsHandler(TeamWasDeleted)
export class TeamWasDeletedSaga implements IEventHandler<TeamWasDeleted> {
  constructor(
    @InjectRepository(TeamEntity)
    private teamRepository: Repository<TeamEntity>
  ) {}

  async handle(event: TeamWasDeleted) {
    const team = await this.teamRepository.findOne(event.id);

    if (!team) {
      return;
    }

    this.teamRepository.remove(team);
  }
}
