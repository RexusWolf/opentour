import { CompetitionDTO } from '@opentour/contracts';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class CompetitionEntity implements CompetitionDTO {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  type: string;

  @Column()
  sportId: string;

  @Column({
    type: 'simple-array',
  })
  moderatorIds: string[];

  constructor(
    id: string,
    name: string,
    type: string,
    sportId: string,
    moderatorIds: string[]
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.sportId = sportId;
    this.moderatorIds = moderatorIds;
  }
}
