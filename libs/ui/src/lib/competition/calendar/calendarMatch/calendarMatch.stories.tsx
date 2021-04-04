import { Meta, Story } from '@storybook/react';
import React from 'react';
import { withNextRouter } from 'storybook-addon-next-router';

import { Match } from '../../shared/Match';
import { teams } from '../../shared/teams';
import { CalendarMatch } from './calendarMatch';

export default {
  component: CalendarMatch,
  title: 'Widgets/CalendarMatch',
  decorators: [withNextRouter],
} as Meta;

const Template: Story<Match> = (args) => <CalendarMatch {...args} />;

export const Default = Template.bind({});
Default.args = {
  localTeam: teams[0],
  visitorTeam: teams[1],
  date: new Date(),
  isScheduled: false,
  result: { localTeam: 0, visitorTeam: 0 },
};
