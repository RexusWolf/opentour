import { render } from '@testing-library/react';
import React from 'react';

import { CompetitionsList } from './competitionsList';

describe('CompetitionsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CompetitionsList competitions={[]} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render a list with the provided competitions', () => {
    const { getByText } = render(<CompetitionsList competitions={[]} />);
    getByText('Nombre');
    getByText('Deporte');
    getByText('Tipo');
  });
});
