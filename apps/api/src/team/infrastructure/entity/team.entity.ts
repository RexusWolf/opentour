import { TeamDTO } from '@opentour/contracts';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class TeamEntity implements TeamDTO {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  competitionId: string;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  captainId: string;

  @Column({
    type: 'simple-array',
  })
  membersIds: string[];

  constructor(
    id: string,
    competitionId: string,
    name: string,
    captainId: string,
    membersIds: string[]
  ) {
    this.id = id;
    this.competitionId = competitionId;
    this.name = name;
    this.captainId = captainId;
    this.membersIds = membersIds;
  }
}
