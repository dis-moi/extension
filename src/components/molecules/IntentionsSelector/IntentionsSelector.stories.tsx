import React from 'react';
import { storiesOf } from '@storybook/react';
import IntentionsSelector from './IntentionsSelector';
import { action } from '@storybook/addon-actions';

storiesOf('organisms/IntentionsSelector', module)
  .add('approval', () => (
    <IntentionsSelector value="approval" onChange={action('onChange')} />
  ))
  .add('disapproval', () => (
    <IntentionsSelector value="disapproval" onChange={action('onChange')} />
  ))
  .add('information', () => (
    <IntentionsSelector value="information" onChange={action('onChange')} />
  ))
  .add('alternative', () => (
    <IntentionsSelector value="alternative" onChange={action('onChange')} />
  ))
  .add('other', () => (
    <IntentionsSelector value="other" onChange={action('onChange')} />
  ));
