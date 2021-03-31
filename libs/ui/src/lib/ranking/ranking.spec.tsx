import { Table, TableBody } from '@material-ui/core';
import { getByAltText, getByTestId, render } from '@testing-library/react';
import faker from 'faker';
import React from 'react';

import { TeamStatistics } from '../competition/ranking';
import { Ranking } from './ranking';

describe('Ranking', () => {
  const defaultProps = {
    ranking: [aTeamStatistics()],
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
    getByText(defaultProps.ranking[0].name);
  });
});

function aTeamStatistics(): TeamStatistics {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.title(),
    logo: faker.image.imageUrl(),
    pj: faker.datatype.number(),
    v: faker.datatype.number(),
    e: faker.datatype.number(),
    d: faker.datatype.number(),
    pts: faker.datatype.number(),
    lastFive: ['victory', 'tie', 'tie', 'defeat', 'tie'],
  };
}
