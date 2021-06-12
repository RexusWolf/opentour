import { render } from '@testing-library/react';
import React from 'react';

import { CompetitionRow } from './competitionRow';

const defaultCompetition = {
  id: 'testId',
  sportName: 'Baloncesto',
  type: 'Torneo',
  name: 'Trofeo Rector',
  moderatorIds: ['testId'],
};

describe('CompetitionRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <CompetitionRow competition={defaultCompetition} />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render a row with the competition information', () => {
    const { getByText } = render(
      <CompetitionRow competition={defaultCompetition} />
    );
    getByText(defaultCompetition.name);
    getByText(defaultCompetition.sportName);
    getByText(defaultCompetition.type);
  });
});
