import { Injectable } from '@nestjs/common';
import { EventStore, StoreEventPublisher } from 'event-sourcing-nestjs';
import { CompetitionId } from '../../../competition/domain/model';
import { Team, TeamId, TeamName } from '../../domain/model';
import { Teams } from '../../domain/repository';

@Injectable()
export class TeamEventStore implements Teams {
  constructor(
    private readonly eventStore: EventStore,
    private readonly publisher: StoreEventPublisher
  ) {}

  findOneByName(name: TeamName): Promise<Team | null> {
    throw new Error('Method not implemented.');
  }

  findAllByCompetition(competitionId: CompetitionId): Promise<Team[] | null> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Team[]> {
    throw new Error('Method not implemented.');
  }

  async get(teamId: TeamId): Promise<Team> {
    const team = Reflect.construct(Team, []);
    team.loadFromHistory(await this.eventStore.getEvents('team', teamId.value));

    return team;
  }

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

  nextIdentity(): TeamId {
    return TeamId.generate();
  }
}
