import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Icon from './Icon';
import { IconSize, IconColor, IconName } from '@constants/icon';

type IconSizeType = keyof typeof IconSize;
type IconColorType = keyof typeof IconColor;

const meta: Meta<typeof Icon> = {
    title: 'Components/Icon',
    component: Icon,
    argTypes: {
        name: {
            options: Object.keys(IconName),
            control: { type: 'select' },
        },
        size: {
            options: Object.keys(IconSize),
            control: { type: 'select' },
        },
        color: {
            options: Object.keys(IconColor),
            control: { type: 'select' },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
    args: {
        name: 'HOME',
        size: 'MEDIUM',
        color: 'primary_icon',
    },
};

export const LargeIcon: Story = {
    args: {
        name: 'STAR',
        size: 'LARGE',
        color: 'icon_on_primary',
    },
};

export const ColorfulIcon: Story = {
    args: {
        name: 'HEART',
        size: 'MEDIUM',
        color: 'icon_color',
    },
};

