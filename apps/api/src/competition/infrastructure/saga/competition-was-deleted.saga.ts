import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompetitionWasDeleted } from '../../domain/event';
import { CompetitionEntity } from '../entity/competition.entity';

@EventsHandler(CompetitionWasDeleted)
export class CompetitionWasDeletedSaga
  implements IEventHandler<CompetitionWasDeleted> {
  constructor(
    @InjectRepository(CompetitionEntity)
    private competitionRepository: Repository<CompetitionEntity>
  ) {}

  async handle(event: CompetitionWasDeleted) {
    const competition = await this.competitionRepository.findOne(event.id);

    if (!competition) {
      return;
    }

    this.competitionRepository.remove(competition);
  }
}
