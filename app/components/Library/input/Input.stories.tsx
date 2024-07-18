import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Input from './Input';
import { InputSize, InputMode } from '@constants/input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(InputSize),
    },
    mode: {
      control: 'select',
      options: Object.values(InputMode),
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// Template for all stories
const Template: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <Input {...args} value={value} onChange={setValue} />;
  },
};

export const Default: Story = {
  ...Template,
  args: {
    size: InputSize.MEDIUM,
    mode: InputMode.NORMAL,
    label: 'Label',
    placeholder: 'Placeholder',
    helperText: 'Helper text',
    fullWidth: true,
  },
};

export const Small: Story = {
  ...Template,
  args: {
    ...Default.args,
    size: InputSize.SMALL,
  },
};

export const Large: Story = {
  ...Template,
  args: {
    ...Default.args,
    size: InputSize.LARGE,
  },
};

export const Active: Story = {
  ...Template,
  args: {
    ...Default.args,
    mode: InputMode.ACTIVE,
  },
};

export const Disabled: Story = {
  ...Template,
  args: {
    ...Default.args,
    mode: InputMode.DISABLED,
  },
};

export const Error: Story = {
  ...Template,
  args: {
    ...Default.args,
    mode: InputMode.ERROR,
    helperText: 'Error message',
  },
};

export const Positive: Story = {
  ...Template,
  args: {
    ...Default.args,
    mode: InputMode.POSITIVE,
    helperText: 'Positive message',
  },
};

export const WithoutLabel: Story = {
  ...Template,
  args: {
    ...Default.args,
    label: undefined,
  },
};

export const WithoutHelperText: Story = {
  ...Template,
  args: {
    ...Default.args,
    helperText: undefined,
  },
};

export const NotFullWidth: Story = {
  ...Template,
  args: {
    ...Default.args,
    fullWidth: false,
  },
};