import { RankingDTO } from '@opentour/contracts';
import { render } from '@testing-library/react';
import faker from 'faker';
import React from 'react';

import { Ranking } from './ranking';

describe('Ranking', () => {
  const defaultProps = {
    ranking: aRanking(),
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
        name: faker.name.title(),
        matchPlayeds: faker.datatype.number(),
        victories: faker.datatype.number(),
        ties: faker.datatype.number(),
        defeats: faker.datatype.number(),
        points: faker.datatype.number(),
        lastFive: ['victory', 'tie', 'tie', 'defeat', 'tie'],
      },
    ],
  };
}
