import { Meta, Story } from '@storybook/react';
import React from 'react';
import { withNextRouter } from 'storybook-addon-next-router';

import { ranking } from '../../shared/ranking';
import { Props, TeamRankingRow } from './teamRankingRow';

export default {
  component: TeamRankingRow,
  title: 'Widgets/TeamRankingRow',
  decorators: [withNextRouter],
} as Meta;

const Template: Story<Props> = (args) => <TeamRankingRow {...args} />;

export const Default = Template.bind({});
Default.args = {
  team: ranking[0],
};
