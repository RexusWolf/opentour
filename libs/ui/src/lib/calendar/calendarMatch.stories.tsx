import { Meta, Story } from '@storybook/react';
import React from 'react';
import { withNextRouter } from 'storybook-addon-next-router';

import { teams } from '../competition/teams';
import { CalendarMatch, Props } from './calendarMatch';

export default {
  component: CalendarMatch,
  title: 'Widgets/CalendarMatch',
  decorators: [withNextRouter],
} as Meta;

const Template: Story<Props> = (args) => <CalendarMatch {...args} />;

export const Default = Template.bind({});
Default.args = {
  localTeam: teams[0],
  visitorTeam: teams[1],
  date: { day: 'Mar, 9/3', hour: '21:00' },
  isScheduled: false,
};
