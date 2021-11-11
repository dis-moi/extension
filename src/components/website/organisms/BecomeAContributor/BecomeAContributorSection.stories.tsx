import React, { ReactElement } from 'react';
import { StoryFn } from '@storybook/addons';
import BecomeAContributorSection, {
  BecomeAContributorSectionProps
} from './BecomeAContributorSection';

export default {
  title: 'Website/Organisms/BecomeAContributorSection',
  argTypes: {},
  decorators: [
    (getStory: StoryFn<ReactElement>) => (
      <div style={{ margin: '-1rem', backgroundColor: 'white' }}>
        <>{getStory()}</>
      </div>
    )
  ]
};

export const _BecomeAContributorSection = (
  args: BecomeAContributorSectionProps
) => <BecomeAContributorSection {...args} />;
