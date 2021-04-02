import { getByAltText, getByTestId, render } from '@testing-library/react';
import faker from 'faker';
import React from 'react';

import { CalendarMatch } from './calendarMatch';

describe('CalendarMatch', () => {
  const defaultProps = {
    localTeam: aTeam(),
    visitorTeam: aTeam(),
    date: new Date(),
    isScheduled: false,
    result: { localTeam: 0, visitorTeam: 0 },
  };

  it('should render successfully', () => {
    const { baseElement } = render(<CalendarMatch {...defaultProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render a match with a schedule buttons and two teams', () => {
    const { getByText } = render(<CalendarMatch {...defaultProps} />);
    getByText(defaultProps.localTeam.name);
    getByText(defaultProps.visitorTeam.name);
    getByText('Schedule');
  });
});

function aTeam() {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.title(),
    logo: faker.internet.url(),
  };
}
