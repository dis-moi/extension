import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Notification from 'components/organisms/Notification';
import Subscriptions from './Subscriptions';
import { generateContributor } from 'test/fakers/generateContributor';

storiesOf('screens/Subscriptions', module)
  .addDecorator(getStory => (
    <Router>
      <Notification close={action('close')}>{getStory()}</Notification>
    </Router>
  ))
  .add('no subscriptions', () => (
    <Subscriptions
      openSubscriptions={action('openSubscriptions')}
      subscribedContributors={[]}
    />
  ))
  .add('few subscriptions', () => (
    <Subscriptions
      openSubscriptions={action('openSubscriptions')}
      subscribedContributors={Array.from(Array(5), () => generateContributor())}
    />
  ))
  .add('a lot of subscriptions', () => (
    <Subscriptions
      openSubscriptions={action('openSubscriptions')}
      subscribedContributors={Array.from(Array(50), () =>
        generateContributor()
      )}
    />
  ));
