import { render } from '@testing-library/react';
import faker from 'faker';
import React from 'react';

import { LeagueCalendar } from './leagueCalendar';

describe('LeagueCalendar', () => {
  const defaultProps = {
    matches: [
      {
        id: 'testId',
        competitionId: 'testId',
        index: 0,
        journey: '-',
        localTeam: aTeam(),
        visitorTeam: aTeam(),
        date: new Date(),
        finished: null,
      },
    ],
  };

  it('should render successfully', () => {
    const { baseElement } = render(<LeagueCalendar {...defaultProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render a calendar with matches', () => {
    const { getByText } = render(<LeagueCalendar {...defaultProps} />);
    getByText(defaultProps.matches[0].localTeam.name);
    getByText(defaultProps.matches[0].visitorTeam.name);
  });
});

function aTeam() {
  return {
    name: faker.name.title(),
    logo: faker.internet.url(),
    score: faker.datatype.number(),
  };
}
