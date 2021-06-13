import { CompetitionId } from '../../../src/competition/domain';
import {
  Match,
  MatchId,
  MatchIndex,
  MatchJourney,
} from '../../../src/match/domain';
import { TeamId } from '../../../src/team/domain';
import faker = require('faker');

export class MatchBuilder {
  static random(): Match {
    return Match.create({
      id: MatchId.fromString(faker.datatype.uuid()),
      competitionId: CompetitionId.fromString(faker.datatype.uuid()),
      index: MatchIndex.fromNumber(faker.datatype.number()),
      journey: MatchJourney.fromString(faker.random.word()),
      localTeamId: TeamId.fromString(faker.datatype.uuid()),
      visitorTeamId: TeamId.fromString(faker.datatype.uuid()),
    });
  }
}
