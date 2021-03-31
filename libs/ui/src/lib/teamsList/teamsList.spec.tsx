import { getByAltText, getByTestId, render } from '@testing-library/react';
import faker from 'faker';
import React from 'react';

import { teams } from '../competition/teams';
import { TeamList } from './teamsList';

describe('TeamList', () => {
  const defaultProps = {
    teams: [teams[0]],
  };

  it('should render successfully', () => {
    const { baseElement } = render(<TeamList {...defaultProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render a list with the teams and a remove button for each team', () => {
    const { getByText } = render(<TeamList {...defaultProps} />);
    getByText(teams[0].name);
    getByText('Remove');
  });
});

function aTeam() {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.title(),
    logo: faker.internet.url(),
  };
}
