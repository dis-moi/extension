import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { generateStatefulContributor } from 'test/fakers/generateContributor';
import Wrapper from '../../ScreenWrapper';
import { SubscriptionsScreen } from './SubscriptionsScreen';

storiesOf('screens/SubscriptionsScreen', module)
  .addDecorator(getStory => <Wrapper>{getStory()}</Wrapper>)
  .add('subcriptions', () => {
    const subscriptions = [
      generateStatefulContributor({ subscribed: false }),
      generateStatefulContributor({ subscribed: true }),
      generateStatefulContributor({ subscribed: false })
    ];
    const suggestions = [
      generateStatefulContributor({ subscribed: false }),
      generateStatefulContributor({ subscribed: true }),
      generateStatefulContributor({ subscribed: false })
    ];
    return (
      <SubscriptionsScreen
        subscriptions={subscriptions}
        suggestions={suggestions}
        allContributors={subscriptions.concat(suggestions)}
        subscribe={() => action('subscribe')}
        unsubscribe={() => action('unsubscribe')}
        goToSuggestions={action('goToSuggestions')}
      />
    );
  })
  .add('subcriptions empty', () => {
    const suggestions = [
      generateStatefulContributor({ subscribed: false }),
      generateStatefulContributor({ subscribed: true }),
      generateStatefulContributor({ subscribed: false })
    ];
    return (
      <SubscriptionsScreen
        subscriptions={[]}
        suggestions={suggestions}
        allContributors={suggestions}
        subscribe={() => action('subscribe')}
        unsubscribe={() => action('unsubscribe')}
        goToSuggestions={action('goToSuggestions')}
      />
    );
  })
  .add('suggestions empty', () => {
    const subscriptions = [
      generateStatefulContributor({ subscribed: false }),
      generateStatefulContributor({ subscribed: true }),
      generateStatefulContributor({ subscribed: false })
    ];
    return (
      <SubscriptionsScreen
        subscriptions={subscriptions}
        suggestions={[]}
        allContributors={subscriptions}
        subscribe={() => action('subscribe')}
        unsubscribe={() => action('unsubscribe')}
        goToSuggestions={action('goToSuggestions')}
      />
    );
  });
