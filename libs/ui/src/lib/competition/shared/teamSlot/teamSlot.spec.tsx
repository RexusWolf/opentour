import { render } from '@testing-library/react';
import faker from 'faker';
import React from 'react';

import { TeamSlot } from './teamSlot';

describe('TeamSlot', () => {
  const defaultProps = {
    name: faker.name.title(),
    logo: faker.image.imageUrl(),
  };

  it('should render successfully', () => {
    const { baseElement } = render(<TeamSlot {...defaultProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render a team slot with a team name and its logo', () => {
    const { getByText, getByAltText } = render(<TeamSlot {...defaultProps} />);
    getByText(defaultProps.name);
    getByAltText(defaultProps.name + '-logo');
  });
});
