import React, { ReactElement } from 'react';
import { StoryFn } from '@storybook/addons';
import HowItWorksSection, { HowItWorksSectionProps } from './HowItWorksSection';

export default {
  title: 'Website/Organisms',
  decorators: [
    (getStory: StoryFn<ReactElement>) => (
      <div style={{ margin: '-1rem' }}>
        <>{getStory()}</>
      </div>
    )
  ]
};

export const _HowItWorksSection = (args: HowItWorksSectionProps) => (
  <HowItWorksSection {...args} />
);
