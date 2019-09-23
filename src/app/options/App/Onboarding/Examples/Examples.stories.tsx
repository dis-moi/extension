import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import Examples from './Examples';
import { generateContributor } from 'test/fakers/generateContributor';
import { action } from '@storybook/addon-actions';

storiesOf('screens/Onboarding/Examples', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('Lmem --> Bulles', () => (
    <Examples
      updatedFromLmem={true}
      suggestions={[
        { ...generateContributor(), subscribed: true },
        { ...generateContributor(), subscribed: true },
        { ...generateContributor(), subscribed: true }
      ]}
      subscribe={() => action('subscribe')}
      unsubscribe={() => action('unsubscribe')}
    />
  ))
  .add('Bulles', () => (
    <Examples
      updatedFromLmem={false}
      suggestions={[
        { ...generateContributor(), subscribed: true },
        { ...generateContributor(), subscribed: true },
        { ...generateContributor(), subscribed: true }
      ]}
      subscribe={() => action('subscribe')}
      unsubscribe={() => action('unsubscribe')}
    />
  ));
