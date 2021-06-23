import React, { ReactElement } from 'react';
import { StoryFn } from '@storybook/addons';
import Header from '../../molecules/Header/Header';
import CoverSection, { CoverSectionProps } from './CoverSection';

export default {
  title: 'Website/Organisms',
  decorators: [
    (getStory: StoryFn<ReactElement>) => (
      <div style={{ margin: '-1rem' }}>
        <Header />
        <>{getStory()}</>
      </div>
    )
  ]
};

export const _CoverSection = (args: CoverSectionProps) => (
  <CoverSection {...args} />
);
