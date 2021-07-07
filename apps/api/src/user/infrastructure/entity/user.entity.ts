import { UserDTO } from '@opentour/contracts';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity implements UserDTO {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 70,
    nullable: false,
  })
  @Exclude()
  password: string;

  @Column({
    type: 'simple-array',
  })
  roles: string[];

  constructor(id: string, email: string, password: string, roles: string[]) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.roles = roles;
  }
}
