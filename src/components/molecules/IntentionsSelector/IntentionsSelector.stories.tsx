import React from 'react';
import { storiesOf } from '@storybook/react';
import IntentionsSelector from './IntentionsSelector';

storiesOf('organisms/IntentionsSelector', module)
  .add('approval', () => <IntentionsSelector value="approval" />)
  .add('disapproval', () => <IntentionsSelector value="disapproval" />)
  .add('information', () => <IntentionsSelector value="information" />)
  .add('alternative', () => <IntentionsSelector value="alternative" />)
  .add('other', () => <IntentionsSelector value="other" />);
