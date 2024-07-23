import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import BoardBox from './BoardBox';
import { IconName, IconSize } from '@constants/icon';
import { IconColor } from '@constants/colors';

const meta: Meta<typeof BoardBox> = {
  title: 'Components/BoardBox',
  component: BoardBox,
  argTypes: {
    title: { control: 'text' },
    body: { control: 'text' },
    clicked: { control: 'boolean' },
    iconName: { control: 'select', options: Object.values(IconName) },
    iconSize: { control: 'select', options: Object.values(IconSize) },
    iconColor: { control: 'select', options: Object.values(IconColor) },
  },
};

export default meta;
type Story = StoryObj<typeof BoardBox>;

export const Default: Story = {
  args: {
    title: 'Board Title',
    body: 'Board description goes here',
    clicked: false,
    // iconName: 'HOME',
    iconSize:IconSize.MEDIUM ,
    // iconColor: 'primary_icon',
    onClick: (type: string) => console.log(`Clicked: ${type}`),
  },
};

export const Clicked: Story = {
  args: {
    ...Default.args,
    clicked: true,
  },
};

export const LongContent: Story = {
  args: {
    ...Default.args,
    title: 'Very Long Board Title That Might Wrap',
    body: 'This is a very long description that might cause the text to wrap to multiple lines in the BoardBox component.',
  },
};