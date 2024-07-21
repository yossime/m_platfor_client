// // ProjectBox.stories.tsx
// import React from 'react';
// import { Meta, StoryObj } from '@storybook/react';
// import ProjectBox from './ProjectBox';
// import { ButtonType, ButtonVariant, ButtonSize } from '@constants/button';

// const meta: Meta<typeof ProjectBox> = {
//   title: 'Components/ProjectBox',
//   component: ProjectBox,
//   argTypes: {
//     project: { control: 'object' },
//     clicked: { control: 'boolean' },
//     disabled: { control: 'boolean' },
//     onSelect: { action: 'selected' },
//     onDelete: { action: 'deleted' },
//   },
// };

// export default meta;
// type Story = StoryObj<typeof ProjectBox>;

// export const Default: Story = {
//   args: {
//     project: {
//       id: '1',
//       name: 'Project Name',
//       imageUrl: 'https://example.com/project-image.jpg',
//     },
//     clicked: false,
//     disabled: false,
//     onSelect: (id: string) => console.log(`Selected: ${id}`),
//     onDelete: (id: string) => console.log(`Deleted: ${id}`),
//   },
// };

// export const Clicked: Story = {
//   args: {
//     ...Default.args,
//     clicked: true,
//   },
// };

// export const Disabled: Story = {
//   args: {
//     ...Default.args,
//     disabled: true,
//   },
// };

