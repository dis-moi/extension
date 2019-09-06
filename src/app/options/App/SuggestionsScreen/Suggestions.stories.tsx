import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { SuggestionsScreen } from './SuggestionsScreen';
import { generateContributor } from 'test/fakers/generateContributor';

storiesOf('screens/SuggestionsScreen', module).add('suggestions', () => (
  <SuggestionsScreen
    suggestions={[
      generateContributor(),
      { ...generateContributor(), subscribed: true },
      generateContributor()
    ]}
    subscribe={() => action('subscribe')}
    unsubscribe={() => action('unsubscribe')}
  />
));
