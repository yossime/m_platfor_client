import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CreateProjectBox from './CreateProjectBox';

const meta: Meta<typeof CreateProjectBox> = {
  title: 'Components/CreateProjectBox',
  component: CreateProjectBox,
  argTypes: {
    text: { control: 'text' },
    clicked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof CreateProjectBox>;

export const Default: Story = {
  args: {
    text: 'Create New Project',
    clicked: false,
    disabled: false,
    onClick: () => console.log('Create project clicked'),
  },
};

export const Clicked: Story = {
  args: {
    ...Default.args,
    clicked: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const LongText: Story = {
  args: {
    ...Default.args,
    text: 'Create a New Project with a Very Long Name',
  },
};