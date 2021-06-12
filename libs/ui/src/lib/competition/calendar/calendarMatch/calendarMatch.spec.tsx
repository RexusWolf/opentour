import { MatchDTO } from '@opentour/contracts';
import { render } from '@testing-library/react';
import React from 'react';

import { CalendarMatch } from './calendarMatch';

describe('CalendarMatch', () => {
  const match: MatchDTO = {
    id: 'testId',
    index: 0,
    journey: 'Cuartos',
    competitionId: 'testId',
    localTeam: {
      name: 'testTeam',
      score: 0,
    },
    visitorTeam: {
      name: 'testTeam',
      score: 0,
    },
    date: new Date(),
  };

  it('should render successfully', () => {
    const { baseElement } = render(<CalendarMatch match={match} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render a match with a schedule buttons and two teams', () => {
    const { getByText } = render(<CalendarMatch match={match} />);
    getByText(match.localTeam.name);
    getByText(match.visitorTeam.name);
    getByText('Schedule');
  });
});
