import { getByAltText, getByTestId, render } from '@testing-library/react';
import React from 'react';

import { Homepage } from './homepage';

describe('Homepage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Homepage />);
    expect(baseElement).toBeTruthy();
  });
  it('should render a layout with three buttons and an image', () => {
    const { getByText, getByAltText } = render(<Homepage />);
    getByText('Competitions list');
    getByText('My competitions');
    getByText('Create competition');
    getByAltText('opentour-homepage-logo');
  });
});
