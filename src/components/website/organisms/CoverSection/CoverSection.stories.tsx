import React, { ReactElement } from 'react';
import { StoryFn } from '@storybook/addons';
import CoverSection, { CoverSectionProps } from './CoverSection';

export default {
  title: 'Website/Organisms/CoverSection',
  decorators: [
    (getStory: StoryFn<ReactElement>) => (
      <div style={{ margin: '-1rem' }}>
        <>{getStory()}</>
      </div>
    )
  ]
};

export const _CoverSection = (args: CoverSectionProps) => (
  <CoverSection {...args} />
);
