import React, { ReactElement } from 'react';
import { StoryFn } from '@storybook/addons';
import CoverSection, { CoverSectionProps } from './CoverSection';
import CoverSectionStaticV1, {
  CoverSectionStaticV1Props
} from './CoverSectionStaticV1';

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

export const _CoverSectionStaticV1 = (args: CoverSectionStaticV1Props) => (
  <CoverSectionStaticV1 {...args} />
);
