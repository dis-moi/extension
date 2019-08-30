import React from 'react';
import { storiesOf } from '@storybook/react';
import ContributorLarge from './ContributorLarge';
import ContributorCompact from './ContributorCompact';
import { generateContributor } from '../../../../test/fakers/generateContributor';
import { action } from '@storybook/addon-actions';

storiesOf('organisms/Contributor', module)
  .add('large', () => (
    <ContributorLarge
      contributor={generateContributor()}
      onSubscribe={action('onSubscribe')}
      onUnsubscribe={action('onUnsubscribe')}
    />
  ))
  .add('compact', () => (
    <ContributorCompact
      contributor={generateContributor()}
      onSubscribe={action('onSubscribe')}
      onUnsubscribe={action('onUnsubscribe')}
    />
  ));
