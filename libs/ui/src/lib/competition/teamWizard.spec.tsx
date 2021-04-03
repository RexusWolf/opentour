import { render } from '@testing-library/react';
import React from 'react';

import { TeamWizard } from './teamWizard';

describe('TeamWizard', () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
  };

  it('should render successfully', () => {
    const { baseElement } = render(<TeamWizard {...defaultProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render the text field and buttons to create a competition and two buttons', () => {
    const { getByText } = render(<TeamWizard {...defaultProps} />);
    getByText('Team name');
    getByText('Cancel');
    getByText('Create team');
  });
});
