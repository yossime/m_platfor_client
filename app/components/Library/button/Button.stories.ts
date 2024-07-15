// Button.stories.tsx

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { ButtonType, ButtonVariant, ButtonSize, ButtonMode } from '@constants/buttton';
// import { IconName } from '../icon/Icon';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    type: {
      options: Object.values(ButtonType),
      control: { type: 'select' },
    },
    variant: {
      options: Object.values(ButtonVariant),
      control: { type: 'select' },
    },
    size: {
      options: Object.values(ButtonSize),
      control: { type: 'select' },
    },
    mode: {
      options: Object.values(ButtonMode),
      control: { type: 'select' },
    },
    text: { control: 'text' },
    icon: {
      // options: Object.keys(IconName),
      control: { type: 'select' },
    },
    iconPosition: {
      options: ['left', 'right'],
      control: { type: 'radio' },
    },
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
    text: 'Button',
  },
};

export const WithIcon: Story = {
  args: {
    ...Default.args,
    icon: 'HOME',
    iconPosition: 'left',
  },
};

export const SecondaryButton: Story = {
  args: {
    ...Default.args,
    variant: ButtonVariant.SECONDARY,
  },
};

export const NegativeButton: Story = {
  args: {
    ...Default.args,
    type: ButtonType.NEGATIVE,
  },
};

export const DisabledButton: Story = {
  args: {
    ...Default.args,
    mode: ButtonMode.DISABLED,
  },
};

export const FullWidthButton: Story = {
  args: {
    ...Default.args,
    fullWidth: true,
  },
};

// export const AllVariants: Story = {
//   render: () => (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//       {Object.values(ButtonType).map((type) =>
//         Object.values(ButtonVariant).map((variant) =>
//           Object.values(ButtonSize).map((size) => (
//             <Button
//               key={`${type}-${variant}-${size}`}
//               type={type}
//               variant={variant}
//               size={size}
//               text={`${type} ${variant} ${size}`}
//             />
//           ))
//         )
//       )}
//     </div>
//   ),
// };