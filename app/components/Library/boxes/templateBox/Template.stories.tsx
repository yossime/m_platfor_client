import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import TemplateBox from './TemplateBox';

const meta: Meta<typeof TemplateBox> = {
  title: 'Components/TemplateBox',
  component: TemplateBox,
  argTypes: {
    title: { control: 'text' },
    clicked: { control: 'boolean' },
    backgroundImage: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof TemplateBox>;

export const Default: Story = {
  args: {
    title: 'Template Title',
    clicked: false,
    backgroundImage: 'https://example.com/image.jpg',
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
    title: 'Very Long Template Title That Might Wrap',
  },
};