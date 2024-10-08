import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { IconName, IconSize, IconComponents } from '@constants/icon'; 
import  Icon  from './Icon';
import { IconColor } from '@constants/colors';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    name: { 
      control: 'select', 
      options: Object.keys(IconComponents) as IconName[] 
    },
    size: { control: 'select', options: Object.values(IconSize) },
    color: { control: 'select', options: Object.values(IconColor) },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: IconName.HOME,
    size: IconSize.MEDIUM,
    color: IconColor.PRIMARY,
  },
};

export const LargeIcon: Story = {
  args: {
    ...Default.args,
    size: IconSize.LARGE,
  },
};

export const ColoredIcon: Story = {
  args: {
    ...Default.args,
    color: IconColor.SUCCESS,
  },
};

export const ClickableIcon: Story = {
  args: {
    ...Default.args,
    name: IconName.BELL,
    onClick: () => console.log('Icon clicked'),
  },
};

export const IconGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '20px' }}>
      {Object.values(IconName).map((name) => (
        <div key={name} style={{ textAlign: 'center' }}>
          <Icon name={name} size={IconSize.LARGE} />
          <div style={{ marginTop: '5px', fontSize: '12px' }}>{name}</div>
        </div>
      ))}
    </div>
  ),
};