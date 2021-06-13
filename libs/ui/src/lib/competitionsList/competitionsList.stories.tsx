import { CompetitionDTO } from '@opentour/contracts';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { withNextRouter } from 'storybook-addon-next-router';

import { CompetitionsList } from './competitionsList';

export default {
  component: CompetitionsList,
  title: 'Widgets/CompetitionsList',
  decorators: [withNextRouter],
} as Meta;

const Template: Story<{ competitions: CompetitionDTO }> = (args) => (
  <CompetitionsList competitions={[]} />
);

export const Default = Template.bind({});
Default.args = {
  competitions: [],
};
