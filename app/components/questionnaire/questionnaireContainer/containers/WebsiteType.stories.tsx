import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import WebsiteType from './WebsiteType';
import { QuestionnaireProvider } from '@/context/useQuestionnaire';

export default {
  title: 'Components/WebsiteType',
  component: WebsiteType,
  decorators: [
    (Story) => (
      <QuestionnaireProvider>
        <Story />
      </QuestionnaireProvider>
    ),
  ],
} as Meta;

const Template: StoryFn = (args) => <WebsiteType {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithPreselectedType = Template.bind({});
WithPreselectedType.args = {};
WithPreselectedType.decorators = [
  (Story) => (
  
      <Story />
  ),
];

export const MobileView = Template.bind({});
MobileView.args = {};
MobileView.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};

export const TabletView = Template.bind({});
TabletView.args = {};
TabletView.parameters = {
  viewport: {
    defaultViewport: 'tablet',
  },
};