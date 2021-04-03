import { Meta, Story } from '@storybook/react';
import React from 'react';
import { withNextRouter } from 'storybook-addon-next-router';

import { competitions } from './competitions';
import { CompetitionsList, Props } from './competitionsList';

export default {
  component: CompetitionsList,
  title: 'Widgets/CompetitionsList',
  decorators: [withNextRouter],
} as Meta;

const Template: Story<Props> = (args) => <CompetitionsList {...args} />;

export const Default = Template.bind({});
Default.args = {
  competitions: competitions,
};
