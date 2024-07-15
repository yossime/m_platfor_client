// import React from 'react';
// import { Meta, StoryObj } from '@storybook/react';
// import Text from './Text';
// import { TextSize, FontWeight, TextColor } from '@constants/text';

// type TextType = keyof typeof TextSize;
// type WeightType = keyof typeof FontWeight;
// type TextColorType = keyof typeof TextColor;


// const meta: Meta<typeof Text> = {
//     title: 'Components/Text',
//     component: Text,
//     argTypes: {
//         type: {
//             options: Object.keys(TextSize),
//             control: { type: 'select' },
//         },
//         weight: {
//             options: Object.keys(FontWeight),
//             control: { type: 'select' },
//         },
//         color: {
//             options: Object.keys(TextColor),
//             control: { type: 'select' },
//         },
//         text: { control: 'text' },
//     },
// };

// export default meta;

// type Story = StoryObj<typeof Text>;

// export const Default: Story = {
//     args: {
//         type: 'H1',
//         weight: 'NORMAL',
//         text: 'Sample Text',
//     },
// };

// export const DisplayLarge: Story = {
//     args: {
//         type: 'D1',
//         weight: 'BLOB',
//         text: 'Large Display Text',
//     },
// };

// export const BodyText: Story = {
//     args: {
//         type: 'TEXT1',
//         weight: 'LIGHT',
//         text: 'This is a paragraph of body text.',
//     },
// };

