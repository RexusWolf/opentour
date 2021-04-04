import { Meta, Story } from '@storybook/react';
import React from 'react';
import { withNextRouter } from 'storybook-addon-next-router';

import { Props, TeamWizard } from './teamWizard';

export default {
  component: TeamWizard,
  title: 'Widgets/TeamWizard',
  decorators: [withNextRouter],
} as Meta;

const Template: Story<Props> = (args) => <TeamWizard {...args} />;

export const Default = Template.bind({});
Default.args = {
  open: true,
  onClose: {},
};
