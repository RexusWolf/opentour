import { render } from '@testing-library/react';
import faker from 'faker';
import React from 'react';

import { Calendar } from './calendar';

describe('Calendar', () => {
  const defaultProps = {
    matches: [
      {
        localTeam: aTeam(),
        visitorTeam: aTeam(),
        date: new Date(),
        isScheduled: true,
        result: { localTeam: 0, visitorTeam: 0 },
      },
    ],
  };

  it('should render successfully', () => {
    const { baseElement } = render(<Calendar {...defaultProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render a calendar with matches', () => {
    const { getByText } = render(<Calendar {...defaultProps} />);
    getByText(defaultProps.matches[0].localTeam.name);
    getByText(defaultProps.matches[0].visitorTeam.name);
  });
});

function aTeam() {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.title(),
    logo: faker.internet.url(),
  };
}
