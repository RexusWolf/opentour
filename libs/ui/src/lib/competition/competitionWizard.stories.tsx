import { Meta, Story } from '@storybook/react';
import React from 'react';
import { withNextRouter } from 'storybook-addon-next-router';

import { CompetitionWizard, Props } from './competitionWizard';

export default {
  component: CompetitionWizard,
  title: 'Widgets/CompetitionWizard',
  decorators: [withNextRouter],
} as Meta;

const Template: Story<Props> = (args) => <CompetitionWizard {...args} />;

export const Default = Template.bind({});
Default.args = {
  open: false,
  onClose: {},
};
