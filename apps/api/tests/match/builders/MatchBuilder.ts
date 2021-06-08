import { CompetitionId } from '../../../src/competition/domain/model';
import {
  Match,
  MatchId,
  MatchIndex,
  MatchJourney,
  MatchResult,
  TeamScore,
} from '../../../src/match/domain';
import { TeamId } from '../../../src/team/domain/model';
import faker = require('faker');

export class MatchBuilder {
  private id: MatchId;
  private competitionId: CompetitionId;
  private index: MatchIndex;
  private journey: MatchJourney;
  private localTeamId?: TeamId;
  private visitorTeamId?: TeamId;
  private date?: Date;
  private result?: MatchResult;
  private deleted?: Date;

  constructor() {
    this.id = MatchId.fromString(faker.datatype.uuid());
    this.competitionId = CompetitionId.fromString(faker.datatype.uuid());
    this.index = MatchIndex.fromNumber(faker.datatype.number());
    this.journey = MatchJourney.fromString(faker.random.word());
    this.localTeamId = TeamId.fromString(faker.datatype.uuid());
    this.visitorTeamId = TeamId.fromString(faker.datatype.uuid());
    this.date = new Date(faker.datatype.datetime());
    this.result = new MatchResult({
      localTeamScore: TeamScore.fromNumber(faker.datatype.number()),
      visitorTeamScore: TeamScore.fromNumber(faker.datatype.number()),
    });

    this.deleted = new Date(faker.datatype.datetime());
  }

  build(): Match {
    return Match.create({
      id: this.id,
      competitionId: this.competitionId,
      index: this.index,
      journey: this.journey,
    });
  }
}
