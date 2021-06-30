import { render } from '@testing-library/react';
import faker from 'faker';
import React from 'react';

import { TeamList } from './teamsList';

describe('TeamList', () => {
  const defaultProps = {
    teams: [],
  };

  it('should render successfully', () => {
    const { baseElement } = render(<TeamList {...defaultProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render a list with the teams and a remove button for each team', () => {
    const team = aTeam();
    const { getByText } = render(<TeamList teams={[team]} />);
    getByText(team.name);
    getByText('Eliminar');
  });
});

function aTeam() {
  return {
    id: faker.datatype.uuid(),
    competitionId: faker.datatype.uuid(),
    name: faker.name.title(),
    captainId: faker.datatype.uuid(),
    membersIds: [faker.datatype.uuid()],
    logo: faker.image.imageUrl(),
  };
}
