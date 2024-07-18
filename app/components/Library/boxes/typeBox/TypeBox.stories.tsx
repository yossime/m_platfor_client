import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import TypeBox from './TypeBox';

const meta: Meta<typeof TypeBox> = {
  title: 'Components/TypeBox',
  component: TypeBox,
  argTypes: {
    title: { control: 'text' },
    clicked: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof TypeBox>;

export const Default: Story = {
  args: {
    title: 'Type Title',
    clicked: false,
    onClick: (type: string) => console.log(`Clicked: ${type}`),
  },
};

export const Clicked: Story = {
  args: {
    ...Default.args,
    clicked: true,
  },
};

export const LongTitle: Story = {
  args: {
    ...Default.args,
    title: 'Very Long Type Title That Might Wrap',
  },
};