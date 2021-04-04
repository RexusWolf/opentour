import { Meta, Story } from '@storybook/react';
import React from 'react';
import { withNextRouter } from 'storybook-addon-next-router';

import { ranking } from '../shared/ranking';
import { Props, Ranking } from './ranking';

export default {
  component: Ranking,
  title: 'Widgets/Ranking',
  decorators: [withNextRouter],
} as Meta;

const Template: Story<Props> = (args) => <Ranking {...args} />;

export const Default = Template.bind({});
Default.args = {
  ranking: ranking,
};
