import React from 'react';
import { storiesOf } from '@storybook/react';
import ContributorLarge from './ContributorLarge';
import ContributorCompact from './ContributorCompact';
import { generateStatefulContributor } from 'test/fakers/generateContributor';
import { action } from '@storybook/addon-actions';

storiesOf('organisms/Contributor', module)
  .add('large unsubscribed', () => (
    <ContributorLarge
      contributor={generateStatefulContributor({ subscribed: false })}
      onSubscribe={action('onSubscribe')}
      onUnsubscribe={action('onUnsubscribe')}
    />
  ))
  .add('large subscribed', () => (
    <ContributorLarge
      contributor={generateStatefulContributor({ subscribed: true })}
      onSubscribe={action('onSubscribe')}
      onUnsubscribe={action('onUnsubscribe')}
    />
  ))
  .add('compact unsubscribed', () => (
    <ContributorCompact
      contributor={generateStatefulContributor({ subscribed: false })}
      onSubscribe={action('onSubscribe')}
      onUnsubscribe={action('onUnsubscribe')}
    />
  ))
  .add('compact subscribed', () => (
    <ContributorCompact
      contributor={generateStatefulContributor({ subscribed: true })}
      onSubscribe={action('onSubscribe')}
      onUnsubscribe={action('onUnsubscribe')}
    />
  ));
