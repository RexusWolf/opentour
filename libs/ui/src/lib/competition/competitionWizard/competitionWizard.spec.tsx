import { render } from '@testing-library/react';
import React from 'react';

import { CompetitionWizard } from './competitionWizard';

describe('CompetitionWizard', () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
  };

  it('should render successfully', () => {
    const { baseElement } = render(<CompetitionWizard {...defaultProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render the text field and buttons to create a competition and two buttons', () => {
    const { getByText } = render(<CompetitionWizard {...defaultProps} />);
    getByText('Nombre de la competición');
    getByText('Selecciona el tipo de competición:');
    getByText('Selecciona el deporte:');
    getByText('Cancelar');
    getByText('Crear competición');
  });
});
