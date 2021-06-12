import { render } from '@testing-library/react';
import React from 'react';

import { MatchManager } from './matchManager';

describe('MatchManager', () => {
  const defaultProps = {
    date: new Date(),
    isScheduled: false,
    result: { localTeamScore: 0, visitorTeamScore: 0 },
    onClose: jest.fn(),
    handleLocalTeamScore: jest.fn(),
    handleVisitorTeamScore: jest.fn(),
    handleDateChange: jest.fn(),
    handleWasScheduled: jest.fn(),
  };

  it('should render successfully', () => {
    const { baseElement } = render(<MatchManager {...defaultProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render a match with a date picker, two text fields and two buttons', () => {
    const { getByText } = render(<MatchManager {...defaultProps} />);
    getByText('Match date');
    getByText('Local Team Score');
    getByText('Visitor Team Score');
    getByText('Cancel');
    getByText('Schedule match');
  });
});
