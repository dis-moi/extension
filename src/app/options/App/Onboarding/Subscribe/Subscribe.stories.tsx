import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { generateContributor } from 'test/fakers/generateContributor';
import Subscribe from '../Subscribe';

storiesOf('screens/Onboarding/Subscribe', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('Lmem --> Bulles', () => (
    <Subscribe
      updatedFromLmem={true}
      suggestions={[
        generateContributor(),
        generateContributor(),
        generateContributor()
      ]}
      nbSubscriptions={0}
      subscribe={() => action('subscribe')}
      unsubscribe={() => action('unsubscribe')}
    />
  ))
  .add('Bulles', () => (
    <Subscribe
      updatedFromLmem={false}
      suggestions={[
        generateContributor(),
        generateContributor(),
        generateContributor()
      ]}
      nbSubscriptions={0}
      subscribe={() => action('subscribe')}
      unsubscribe={() => action('unsubscribe')}
    />
  ))
  .add('Bulles (1 subscriptions)', () => (
    <Subscribe
      updatedFromLmem={false}
      suggestions={[
        generateContributor(),
        { ...generateContributor(), subscribed: true },
        generateContributor()
      ]}
      nbSubscriptions={1}
      subscribe={() => action('subscribe')}
      unsubscribe={() => action('unsubscribe')}
    />
  ));
