import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { ButtonType, ButtonVariant, ButtonSize, ButtonMode } from '@constants/button';
import { IconName } from '@constants/icon';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    type: { control: 'select', options: Object.values(ButtonType) },
    variant: { control: 'select', options: Object.values(ButtonVariant) },
    size: { control: 'select', options: Object.values(ButtonSize) },
    mode: { control: 'select', options: Object.values(ButtonMode) },
    text: { control: 'text' },
    icon: { control: 'select', options: Object.values(IconName) },
    iconPosition: { control: 'radio', options: ['left', 'right'] },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    type: ButtonType.PRIMARY,
    variant: ButtonVariant.PRIMARY,
    size: ButtonSize.MEDIUM,
    mode: ButtonMode.NORMAL,
    text: 'Button Text',
    fullWidth: false,
  },
};

export const WithIcon: Story = {
  args: {
    ...Default.args,
    iconPosition: 'right',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    mode: ButtonMode.DISABLED,
  },
};

export const FullWidth: Story = {
  args: {
    ...Default.args,
    fullWidth: true,
  },
};