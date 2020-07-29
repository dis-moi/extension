import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Notification from 'components/organisms/Notification';
import Subscriptions from './Subscriptions';
import { generateContributor } from 'test/fakers/generateContributor';

const commonProps = {
  openSubscriptions: action('openSubscriptions'),
  onContributorClick: action('onContributorClick')
};

storiesOf('Extension/Subscriptions', module)
  .addDecorator(getStory => (
    <Router>
      <Notification close={action('close')}>{getStory()}</Notification>
    </Router>
  ))
  .add('no subscriptions', () => (
    <Subscriptions {...commonProps} subscribedContributors={[]} />
  ))
  .add('few subscriptions', () => (
    <Subscriptions
      {...commonProps}
      subscribedContributors={Array.from(Array(3), () => generateContributor())}
    />
  ))
  .add('some subscriptions', () => (
    <Subscriptions
      {...commonProps}
      subscribedContributors={Array.from(Array(13), () =>
        generateContributor()
      )}
    />
  ))
  .add('a lot of subscriptions', () => (
    <Subscriptions
      {...commonProps}
      subscribedContributors={Array.from(Array(50), () =>
        generateContributor()
      )}
    />
  ));
