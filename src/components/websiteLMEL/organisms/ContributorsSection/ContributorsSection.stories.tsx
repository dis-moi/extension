import React, { ReactElement } from 'react';
import { StoryFn } from '@storybook/addons';
import { contributorsIds } from '../../../../app/website/src/contents/ContributorsIds';
import ContributorsSection, {
  ContributorsSectionProps
} from './ContributorsSection';

export default {
  title: 'Website/Organisms/ContributorsSection',
  argTypes: {
    contributorsIds: { control: { type: 'object' } }
  },
  decorators: [
    (getStory: StoryFn<ReactElement>) => (
      <div style={{ margin: '-1rem', backgroundColor: 'white' }}>
        <>{getStory()}</>
      </div>
    )
  ]
};

export const _ContributorsSection = (args: ContributorsSectionProps) => (
  <ContributorsSection {...args} />
);
_ContributorsSection.args = {
  contributorsIds: contributorsIds
};
