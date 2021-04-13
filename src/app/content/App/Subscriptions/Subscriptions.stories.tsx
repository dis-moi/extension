import React, { ReactElement } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/addons';
import Notification from 'components/organisms/Notification';
import { generateContributor } from 'test/fakers/generateContributor';
import Subscriptions from './Subscriptions';

const commonProps = {
  openSubscriptions: action('openSubscriptions'),
  onContributorClick: action('onContributorClick')
};

export default {
  title: 'Extension/Subscriptions',

  decorators: [
    (getStory: StoryFn<ReactElement>) => (
      <Router>
        <Notification close={action('close')}>{getStory()}</Notification>
      </Router>
    )
  ]
};

export const NoSubscriptions = () => (
  <Subscriptions {...commonProps} subscribedContributors={[]} />
);

NoSubscriptions.story = {
  name: 'no subscriptions'
};

export const FewSubscriptions = () => (
  <Subscriptions
    {...commonProps}
    subscribedContributors={Array.from(Array(3), () => generateContributor())}
  />
);

FewSubscriptions.story = {
  name: 'few subscriptions'
};

export const SomeSubscriptions = () => (
  <Subscriptions
    {...commonProps}
    subscribedContributors={Array.from(Array(13), () => generateContributor())}
  />
);

SomeSubscriptions.story = {
  name: 'some subscriptions'
};

export const ALotOfSubscriptions = () => (
  <Subscriptions
    {...commonProps}
    subscribedContributors={Array.from(Array(50), () => generateContributor())}
  />
);

ALotOfSubscriptions.story = {
  name: 'a lot of subscriptions'
};
