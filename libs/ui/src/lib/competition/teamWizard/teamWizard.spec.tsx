import { render } from '@testing-library/react';
import React from 'react';

import { teamsWithLogos } from '../shared/teams';
import { TeamWizard } from './teamWizard';

describe('TeamWizard', () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
    availableTeamLogos: teamsWithLogos.map((team) => team.logo),
    competitionId: 'testId',
  };

  it('should render successfully', () => {
    const { baseElement } = render(<TeamWizard {...defaultProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render the text field and buttons to create a competition and two buttons', () => {
    const { getByText } = render(<TeamWizard {...defaultProps} />);
    getByText('Nombre del equipo');
    getByText('Cancelar');
    getByText('Crear equipo');
  });
});
