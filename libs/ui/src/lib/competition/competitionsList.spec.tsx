import { render } from '@testing-library/react';
import React from 'react';

import { competitions } from './competitions';
import { CompetitionsList } from './competitionsList';

describe('CompetitionsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <CompetitionsList competitions={competitions} />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render a list with the provided competitions', () => {
    const { getByText } = render(
      <CompetitionsList competitions={competitions} />
    );
    getByText('Name');
    getByText('Sport');
    getByText('Number of Teams');
  });
});
