import { render } from '@testing-library/react';
import React from 'react';

import { competitions } from '../../shared/competitions';
import { CompetitionRow } from './competitionRow';

describe('CompetitionRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <CompetitionRow competition={competitions[0]} />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render a row with the competition information', () => {
    const { getByText } = render(
      <CompetitionRow competition={competitions[0]} />
    );
    getByText(competitions[0].name);
    getByText(competitions[0].sport);
    getByText(competitions[0].numberOfTeams);
  });
});
