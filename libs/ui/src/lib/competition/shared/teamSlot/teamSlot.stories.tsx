import { Meta, Story } from '@storybook/react';
import React from 'react';
import { withNextRouter } from 'storybook-addon-next-router';

import { teamsWithLogos } from '../teams';
import { Props, TeamSlot } from './teamSlot';

export default {
  component: TeamSlot,
  title: 'Widgets/TeamSlot',
  decorators: [withNextRouter],
} as Meta;

const Template: Story<Props> = (args) => <TeamSlot {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: teamsWithLogos[0].name,
  logo: teamsWithLogos[0].logo,
};
