import { Meta, Story } from '@storybook/react';
import React from 'react';
import { withNextRouter } from 'storybook-addon-next-router';

import { MatchManager, Props } from './matchManager';

export default {
  component: MatchManager,
  title: 'Widgets/MatchManager',
  decorators: [withNextRouter],
} as Meta;

const Template: Story<Props> = (args) => <MatchManager {...args} />;

export const Default = Template.bind({});
Default.args = {
  isScheduled: false,
  result: { localTeamScore: 0, visitorTeamScore: 0 },
  date: new Date(),
};
