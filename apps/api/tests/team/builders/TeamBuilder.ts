import faker = require('faker');
import { CompetitionId } from '../../../src/competition/domain/model';
import { Team, TeamId, TeamName } from '../../../src/team/domain/model';
import { UserId } from '../../../src/user/domain';

export class TeamBuilder {
  private id: TeamId;
  private competitionId: CompetitionId;
  private name: TeamName;
  private captainId: UserId;
  private membersIds: UserId[];
  private deleted: Date;

  constructor() {
    this.id = TeamId.fromString(faker.datatype.uuid());
    this.competitionId = CompetitionId.fromString(faker.datatype.uuid());
    this.name = TeamName.fromString(faker.name.title());
    this.captainId = UserId.fromString(faker.datatype.uuid());
    this.membersIds = [UserId.fromString(faker.datatype.uuid())];
    this.deleted = faker.datatype.datetime();
  }

  build(): Team {
    return Team.create({
      id: this.id,
      name: this.name,
      captainId: this.captainId,
      competitionId: this.competitionId,
    });
  }
}
