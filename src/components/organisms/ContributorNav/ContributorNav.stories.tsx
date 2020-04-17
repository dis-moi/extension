import React from 'react';
import { storiesOf } from '@storybook/react';
import ContributorNav from './ContributorNav';
import { action } from '@storybook/addon-actions';

storiesOf('Components/Organisms/ContributorNav', module)
  .add('on subscriptions screen', () => (
    <ContributorNav
      activeTab={'subscriptions'}
      goToSubscriptions={action('goToSubscriptions')}
      goToSuggestions={action('goToSuggestions')}
    />
  ))
  .add('on suggestions screen', () => (
    <ContributorNav
      activeTab={'suggestions'}
      goToSubscriptions={action('goToSubscriptions')}
      goToSuggestions={action('goToSuggestions')}
    />
  ))
  .add('on other route', () => (
    <ContributorNav
      activeTab={null}
      goToSubscriptions={action('goToSubscriptions')}
      goToSuggestions={action('goToSuggestions')}
    />
  ));
