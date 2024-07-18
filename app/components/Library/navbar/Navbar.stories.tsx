import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Navbar from './Navbar';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
};

export default meta;
type Story = StoryObj<typeof Navbar>;



const MockLogoIcon = () => <div>Logo SVG</div>;

export const Default: Story = {
  render: () => <Navbar logo={MockLogoIcon} />,
};

export const LoggedIn: Story = {
  render: () => <Navbar logo={MockLogoIcon} userName="John Doe" onSignOut={() => console.log('Sign out clicked')} />,
};

export const LoggedInWithEmail: Story = {
  render: () => <Navbar logo={MockLogoIcon} userName="jane@example.com" onSignOut={() => console.log('Sign out clicked')} />,
};