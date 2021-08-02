import React, { ReactElement } from 'react';
import { StoryFn } from '@storybook/addons';
import OurCommitmentsSection, {
  commitmentCards,
  OurCommitmentsSectionProps
} from './OurCommitmentsSection';

export default {
  title: 'Website/Organisms/OurCommitmentsSection',
  argTypes: {
    commitmentCards: {
      control: { type: 'object' }
    }
  },
  decorators: [
    (getStory: StoryFn<ReactElement>) => (
      <div style={{ margin: '-1rem', backgroundColor: 'white' }}>
        <>{getStory()}</>
      </div>
    )
  ]
};

export const _OurCommitmentsSection = (args: OurCommitmentsSectionProps) => (
  <OurCommitmentsSection {...args} />
);
_OurCommitmentsSection.args = {
  commitmentCards: commitmentCards
};
