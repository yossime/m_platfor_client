import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Text  from './Text';
import { TextSize, FontWeight, FontFamily } from '@constants/text';
import { TextColor } from '@constants/colors';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  argTypes: {
    size: { control: 'select', options: Object.keys(TextSize) },
    $family: { control: 'select', options: Object.keys(FontFamily) },
    $weight: { control: 'select', options: Object.keys(FontWeight) },
    color: { control: 'select', options: Object.keys(TextColor) },
    children: { control: 'text' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    size: TextSize.TEXT1,
    $family: FontFamily.Figtree,
    $weight: FontWeight.NORMAL,
    color: TextColor.PRIMARY_TEXT,
    children: 'This is a sample text',
  },
};

export const Heading: Story = {
  args: {
    ...Default.args,
    size: TextSize.H1,
    $family: FontFamily.Poppins,
    $weight: FontWeight.BOLD,
    children: 'Main Heading',
  },
};

export const SecondaryText: Story = {
  args: {
    ...Default.args,
    size: TextSize.TEXT2,
    $weight: FontWeight.NORMAL,
    color: TextColor.SECONDARY_TEXT,
    children: 'This is a secondary text example',
  },
};

export const LinkText: Story = {
  args: {
    ...Default.args,
    color: TextColor.LINK,
    children: 'This is a link text',
  },
};

export const LongText: Story = {
  args: {
    ...Default.args,
    children: 'This is a longer paragraph example. It demonstrates how the text looks when there is more content. This can help check the appearance of longer text in your user interface.',
  },
};