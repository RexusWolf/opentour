import { RankingDTO } from '@opentour/contracts';
import { render } from '@testing-library/react';
import faker from 'faker';
import React from 'react';

import { Ranking } from './ranking';

describe('Ranking', () => {
  const defaultProps = {
    ranking: aRanking(),
    scoreSystem: {
      victory: 3,
      tie: 1,
      defeat: 0,
    },
  };

  it('should render successfully', () => {
    const { baseElement } = render(<Ranking {...defaultProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render a table with the ranking of the teams', () => {
    const { getByText } = render(<Ranking {...defaultProps} />);
    getByText('Club');
    getByText('PJ');
    getByText('V');
    getByText('E');
    getByText('D');
    getByText('Pts');
    getByText('Últimos 5');
    getByText(defaultProps.ranking.teams[0].name);
  });
});

function aRanking(): RankingDTO {
  return {
    id: faker.datatype.uuid(),
    competitionId: faker.datatype.uuid(),
    teams: [
      {
        id: faker.datatype.uuid(),
        name: faker.name.title(),
        logo: faker.image.imageUrl(),
        matchesPlayed: [],
      },
    ],
  };
}
