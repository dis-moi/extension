import React from 'react';
import { action } from '@storybook/addon-actions';
import { generateStatefulContributor } from 'test/fakers/generateContributor';
import ContributorLarge from './ContributorLarge';
import ContributorCompact from './ContributorCompact';

export default {
  title: 'Components/Organisms/Contributor'
};

export const LargeUnsubscribed = () => (
  <ContributorLarge
    contributor={generateStatefulContributor({ subscribed: false })}
    onSubscribe={action('onSubscribe')}
    onUnsubscribe={action('onUnsubscribe')}
  />
);

LargeUnsubscribed.story = {
  name: 'large unsubscribed'
};

export const LargeSubscribed = () => (
  <ContributorLarge
    contributor={generateStatefulContributor({ subscribed: true })}
    onSubscribe={action('onSubscribe')}
    onUnsubscribe={action('onUnsubscribe')}
  />
);

LargeSubscribed.story = {
  name: 'large subscribed'
};

export const CompactUnsubscribed = () => (
  <ContributorCompact
    contributor={generateStatefulContributor({ subscribed: false })}
    onSubscribe={action('onSubscribe')}
    onUnsubscribe={action('onUnsubscribe')}
  />
);

CompactUnsubscribed.story = {
  name: 'compact unsubscribed'
};

export const CompactSubscribed = () => (
  <ContributorCompact
    contributor={generateStatefulContributor({ subscribed: true })}
    onSubscribe={action('onSubscribe')}
    onUnsubscribe={action('onUnsubscribe')}
  />
);

CompactSubscribed.story = {
  name: 'compact subscribed'
};
