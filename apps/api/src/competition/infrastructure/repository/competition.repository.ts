import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  Competition,
  CompetitionId,
  CompetitionName,
} from '../../domain/model';
import { Competitions } from '../../domain/repository';
import { CompetitionEntity } from '../entity/competition.entity';
import { CompetitionMapper } from './competition.mapper';

@Injectable()
export class CompetitionRepository implements Competitions {
  constructor(
    @InjectRepository(CompetitionEntity)
    private competitionRepository: Repository<CompetitionEntity>,
    private competitionMapper: CompetitionMapper,
    private publisher: EventPublisher
  ) {}

  async find(competitionId: CompetitionId): Promise<Competition | null> {
    const competition = await this.competitionRepository.findOne(
      competitionId.value
    );

    if (!competition) {
      return null;
    }

    return this.competitionMapper.entityToAggregate(competition);
  }

  async findAll(): Promise<Competition[]> {
    const competitions = await this.competitionRepository.find();

    return competitions.map(this.competitionMapper.entityToAggregate);
  }

  async findOneByName(name: CompetitionName): Promise<Competition | null> {
    const competition = await this.competitionRepository.findOne({
      name: name.value,
    });

    if (!competition) {
      return null;
    }

    return this.competitionMapper.entityToAggregate(competition);
  }

  async save(competition: Competition): Promise<void> {
    this.competitionRepository.save(
      this.competitionMapper.aggregateToEntity(competition)
    );

    competition = this.publisher.mergeObjectContext(competition);
    competition.commit();
  }
}
