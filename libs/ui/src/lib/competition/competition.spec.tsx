import { render } from '@testing-library/react';
import React from 'react';

import { Competition } from './competition';

const defaultCompetition = {
  id: '',
  sportName: '',
  type: '',
  name: '',
  moderatorIds: [''],
  hasStarted: false,
  scoreSystem: {
    victory: 3,
    tie: 1,
    defeat: 0,
  },
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
