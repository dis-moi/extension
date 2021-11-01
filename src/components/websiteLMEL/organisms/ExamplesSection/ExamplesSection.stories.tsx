import React, { ReactElement } from 'react';
import { StoryFn } from '@storybook/addons';
import ExamplesSection, { ExamplesSectionProps } from './ExamplesSection';

export default {
  title: 'Website/Organisms/ExamplesSection',
  decorators: [
    (getStory: StoryFn<ReactElement>) => (
      <div style={{ margin: '-1rem' }}>
        <>{getStory()}</>
      </div>
    )
  ]
};

export const _ExamplesSection = (args: ExamplesSectionProps) => (
  <ExamplesSection {...args} />
);
