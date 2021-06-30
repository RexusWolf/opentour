import { Meta, Story } from '@storybook/react';
import React from 'react';
import { withNextRouter } from 'storybook-addon-next-router';

import { teamsWithLogos } from '../shared/teams';
import { Props, TeamList } from './teamsList';

export default {
  component: TeamList,
  title: 'Widgets/TeamList',
  decorators: [withNextRouter],
} as Meta;

const Template: Story<Props> = (args) => <TeamList {...args} />;

export const Default = Template.bind({});
Default.args = {
  teams: teamsWithLogos,
};
