import { render } from '@testing-library/react';
import React from 'react';

import { DateAndTimePicker } from './dateAndTimePicker';

describe('DateAndTimePicker', () => {
  const defaultProps = {
    initialDate: new Date(),
    dateChange: jest.fn(),
  };

  it('should render successfully', () => {
    const { baseElement } = render(<DateAndTimePicker {...defaultProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render a a date picker', () => {
    const { getByText } = render(<DateAndTimePicker {...defaultProps} />);
    getByText('Match date');
  });
});
