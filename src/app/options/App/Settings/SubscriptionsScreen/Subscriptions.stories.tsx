import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { generateContributor } from 'test/fakers/generateContributor';
import Wrapper from '../../ScreenWrapper';
import { SubscriptionsScreen } from './SubscriptionsScreen';

storiesOf('screens/SubscriptionsScreen', module)
  .addDecorator(getStory => <Wrapper>{getStory()}</Wrapper>)
  .add('subcriptions', () => (
    <SubscriptionsScreen
      subscriptions={[
        generateContributor(),
        { ...generateContributor(), subscribed: true },
        generateContributor()
      ]}
      suggestions={[
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
      suggestions={[
        generateContributor(),
        { ...generateContributor(), subscribed: true },
        generateContributor()
      ]}
      subscribe={() => action('subscribe')}
      unsubscribe={() => action('unsubscribe')}
      goToSuggestions={action('goToSuggestions')}
    />
  ));
