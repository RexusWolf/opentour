import { TeamDTO } from '@opentour/contracts';
import faker from 'faker';

import {
  generateLeagueMatches,
  generateTournamentMatches,
} from './generateMatches';

describe('Generate matches', () => {
  it('should generate league matches if the competition is a league', () => {
    const teams = [TeamDTOBuilder.random(), TeamDTOBuilder.random()];

    const matches = generateLeagueMatches(teams, faker.datatype.uuid());

    expect(matches).toHaveLength(2);
  });

  it('should generate tournament matches if the competition is a tournament', () => {
    const teams = [
      TeamDTOBuilder.random(),
      TeamDTOBuilder.random(),
      TeamDTOBuilder.random(),
      TeamDTOBuilder.random(),
      TeamDTOBuilder.random(),
      TeamDTOBuilder.random(),
      TeamDTOBuilder.random(),
      TeamDTOBuilder.random(),
    ];

    const matches = generateTournamentMatches(teams, faker.datatype.uuid());
    const quarterMatches = matches.filter(
      (match) => match.journey === 'Cuartos'
    );
    const semifinalMatches = matches.filter(
      (match) => match.journey === 'Semifinal'
    );
    const finalMatches = matches.filter((match) => match.journey === 'Final');

    expect(matches).toHaveLength(7);
    expect(quarterMatches).toHaveLength(4);
    expect(semifinalMatches).toHaveLength(2);
    expect(finalMatches).toHaveLength(1);
  });

  it.only('should generate an extra match if teams are not divisible by 4', () => {
    const teams = [
      TeamDTOBuilder.random(),
      TeamDTOBuilder.random(),
      TeamDTOBuilder.random(),
      TeamDTOBuilder.random(),
      TeamDTOBuilder.random(),
      TeamDTOBuilder.random(),
    ];

    const matches = generateTournamentMatches(teams, faker.datatype.uuid());
    const quarterMatches = matches.filter(
      (match) => match.journey === 'Cuartos'
    );
    const semifinalMatches = matches.filter(
      (match) => match.journey === 'Semifinal'
    );
    const finalMatches = matches.filter((match) => match.journey === 'Final');

    console.log(matches);
    expect(matches).toHaveLength(5);
    expect(quarterMatches).toHaveLength(2);
    expect(semifinalMatches).toHaveLength(2);
    expect(finalMatches).toHaveLength(1);
  });
});

export class TeamDTOBuilder {
  static random(): TeamDTO {
    return {
      id: faker.datatype.uuid(),
      competitionId: faker.datatype.uuid(),
      name: faker.name.title(),
      captainId: faker.datatype.uuid(),
      membersIds: [faker.datatype.uuid()],
      logo: faker.image.imageUrl(),
    };
  }
}
