import { Meta, Story } from '@storybook/react';
import React from 'react';
import { withNextRouter } from 'storybook-addon-next-router';

import { Match } from '../../shared/Match';
import { CalendarMatch } from './calendarMatch';

export default {
  component: CalendarMatch,
  title: 'Widgets/CalendarMatch',
  decorators: [withNextRouter],
} as Meta;

const defaultMatch = {
  id: 'matchId',
  competitionId: 'competitionId',
  index: 0,
  journey: 'Cuartos',
  localTeam: {
    name: 'localTeamName',
    score: 0,
  },
  visitorTeam: {
    name: 'visitorTeamName',
    score: 0,
  },
  date: new Date(),
};

const Template: Story<Match> = () => <CalendarMatch match={defaultMatch} />;

export const Default = Template.bind({});
