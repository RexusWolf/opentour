import { MatchDTO } from '@opentour/contracts';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { MatchResult } from '../../domain/model';

@Entity('matches')
export class MatchEntity implements MatchDTO {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({})
  competitionId: string;

  @Column({})
  index: number;

  @Column({})
  journey: string;

  @Column({})
  localTeamId: string;

  @Column({})
  visitorTeamId: string;

  @Column({})
  date: Date;

  @Column()
  result: { localTeamScore: number; visitorTeamScore: number };

  constructor(
    id: string,
    competitionId: string,
    index: number,
    journey: string,
    localTeamId: string,
    visitorTeamId: string,
    date: Date,
    result: MatchResult
  ) {
    this.id = id;
    this.competitionId = competitionId;
    this.index = index;
    this.journey = journey;
    this.localTeamId = localTeamId;
    this.visitorTeamId = visitorTeamId;
    this.date = date;
    this.result.localTeamScore = result.localTeamScore.value;
    this.result.visitorTeamScore = result.visitorTeamScore.value;
  }
}
