import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompetitionId } from '../../../competition/domain/model';
import { Team, TeamId, TeamName } from '../../domain/model';
import { Teams } from '../../domain/repository';
import { TeamEntity } from '../entity/team.entity';
import { TeamMapper } from './team.mapper';

@Injectable()
export class TeamRepository implements Teams {
  constructor(
    @InjectRepository(TeamEntity)
    private teamRepository: Repository<TeamEntity>,
    private teamMapper: TeamMapper,
    private publisher: EventPublisher
  ) {}

  async find(teamId: TeamId): Promise<Team | null> {
    const team = await this.teamRepository.findOne(teamId.value);

    if (!team) {
      return null;
    }

    return this.teamMapper.entityToAggregate(team);
  }

  async findAll(): Promise<Team[]> {
    const teams = await this.teamRepository.find();

    return teams.map(this.teamMapper.entityToAggregate);
  }

  async findOneByName(name: TeamName): Promise<Team | null> {
    const team = await this.teamRepository.findOne({
      name: name.value,
    });

    if (!team) {
      return null;
    }

    return this.teamMapper.entityToAggregate(team);
  }

  async findAllByCompetition(
    competitionId: CompetitionId
  ): Promise<Team[] | null> {
    const teams = await this.teamRepository.find({
      competitionId: competitionId.value,
    });

    if (!teams) {
      return null;
    }

    return teams.map(this.teamMapper.entityToAggregate);
  }

  save(team: Team): void {
    this.teamRepository.save(this.teamMapper.aggregateToEntity(team));

    team = this.publisher.mergeObjectContext(team);
    team.commit();
  }
}
