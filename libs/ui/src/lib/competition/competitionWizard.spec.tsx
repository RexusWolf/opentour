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
    getByText('Competition name');
    getByText('Select type of competition:');
    getByText('Select sport:');
    getByText('Cancel');
    getByText('Create competition');
  });
});
