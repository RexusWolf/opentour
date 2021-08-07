import { CompetitionId } from '../../../src/competition/domain';
import { Match, MatchId, MatchIndex } from '../../../src/match/domain';
import { Journey } from '../../../src/shared/domain';
import { TeamId } from '../../../src/team/domain';
import faker = require('faker');

export class MatchBuilder {
  static random(): Match {
    return Match.create({
      id: MatchId.fromString(faker.datatype.uuid()),
      competitionId: CompetitionId.fromString(faker.datatype.uuid()),
      index: MatchIndex.fromNumber(faker.datatype.number()),
      journey: Journey.fromString(faker.random.word()),
      localTeamId: TeamId.fromString(faker.datatype.uuid()),
      visitorTeamId: TeamId.fromString(faker.datatype.uuid()),
    });
  }
}
