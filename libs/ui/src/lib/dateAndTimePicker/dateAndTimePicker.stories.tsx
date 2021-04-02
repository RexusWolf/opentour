import { Meta, Story } from '@storybook/react';
import React from 'react';
import { withNextRouter } from 'storybook-addon-next-router';

import { DateAndTimePicker, Props } from './dateAndTimePicker';

export default {
  component: DateAndTimePicker,
  title: 'Widgets/DateAndTimePicker',
  decorators: [withNextRouter],
} as Meta;

const Template: Story<Props> = (args) => <DateAndTimePicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  initialDate: new Date(),
};
