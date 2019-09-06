import React from 'react';
import { storiesOf } from '@storybook/react';
import { SubscriptionsScreen } from './SubscriptionsScreen';
import { action } from '@storybook/addon-actions';
import { generateContributor } from '../../../../../test/fakers/generateContributor';

storiesOf('screens/SubscriptionsScreen', module)
  .add('subcriptions', () => (
    <SubscriptionsScreen
      subscriptions={[
        generateContributor(),
        { ...generateContributor(), subscribed: true },
        generateContributor()
      ]}
      suggestions6={[
        generateContributor(),
        { ...generateContributor(), subscribed: true },
        generateContributor()
      ]}
      subscribe={() => action('subscribe')}
      unsubscribe={() => action('unsubscribe')}
      goToSuggestions={action('goToSuggestions')}
    />
  ))
  .add('subcriptions empty', () => (
    <SubscriptionsScreen
      subscriptions={[]}
      suggestions6={[
        generateContributor(),
        { ...generateContributor(), subscribed: true },
        generateContributor()
      ]}
      subscribe={() => action('subscribe')}
      unsubscribe={() => action('unsubscribe')}
      goToSuggestions={action('goToSuggestions')}
    />
  ));
