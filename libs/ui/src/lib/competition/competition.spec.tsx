import { render } from '@testing-library/react';
import React from 'react';

import { Competition } from './competition';

const defaultCompetition = {
  id: '',
  sportName: '',
  type: '',
  name: '',
  moderatorIds: [''],
};

describe('Competition', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Competition competition={defaultCompetition} />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render three tabs and two buttons', () => {
    const { getByText } = render(
      <Competition competition={defaultCompetition} />
    );
    getByText('Equipos');
    getByText('Calendario');
    getByText('Ranking');
    getByText('Añadir equipo');
    getByText('Comenzar competición');
  });
});
