import { getByAltText, render } from '@testing-library/react';
import faker from 'faker';
import React from 'react';

import { Competition } from './competition';

describe('Competition', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Competition />);
    expect(baseElement).toBeTruthy();
  });

  it('should render three tabs and two buttons', () => {
    const { getByText } = render(<Competition />);
    getByText('Teams');
    getByText('Calendar');
    getByText('Ranking');
    getByText('Create team for competition');
    getByText('Start competition');
  });
});
