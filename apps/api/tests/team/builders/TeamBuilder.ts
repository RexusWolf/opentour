import { CompetitionId } from '../../../src/competition/domain';
import { Team, TeamId, TeamName } from '../../../src/team/domain';
import { TeamLogo } from '../../../src/team/domain/model/team-logo';
import { UserId } from '../../../src/user/domain';
import faker = require('faker');

export class TeamBuilder {
  static random(): Team {
    return Team.create({
      id: TeamId.fromString(faker.datatype.uuid()),
      competitionId: CompetitionId.fromString(faker.datatype.uuid()),
      name: TeamName.fromString(faker.name.title()),
      captainId: UserId.fromString(faker.datatype.uuid()),
      logo: TeamLogo.fromString(faker.image.imageUrl()),
    });
  }
}
