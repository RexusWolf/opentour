import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompetitionId } from '../../../competition/domain/model';
import { Match, MatchId } from '../../domain/model';
import { Matches } from '../../domain/repository';
import { MatchEntity } from '../entity/match.entity';
import { MatchMapper } from './match.mapper';

@Injectable()
export class MatchRepository implements Matches {
  constructor(
    @InjectRepository(MatchEntity)
    private matchRepository: Repository<MatchEntity>,
    private matchMapper: MatchMapper,
    private publisher: EventPublisher
  ) {}

  async find(matchId: MatchId): Promise<Match | null> {
    const match = await this.matchRepository.findOne(matchId.value);

    if (!match) {
      return null;
    }

    return this.matchMapper.entityToAggregate(match);
  }

  async findAll(): Promise<Match[]> {
    const matches = await this.matchRepository.find();

    return matches.map(this.matchMapper.entityToAggregate);
  }

  async findAllByCompetition(
    competitionId: CompetitionId
  ): Promise<Match[] | null> {
    const matches = await this.matchRepository.find({
      competitionId: competitionId.value,
    });

    if (!matches) {
      return null;
    }

    return matches.map(this.matchMapper.entityToAggregate);
  }

  save(match: Match): void {
    this.matchRepository.save(this.matchMapper.aggregateToEntity(match));

    match = this.publisher.mergeObjectContext(match);
    match.commit();
  }
}
