import React from 'react';
import { storiesOf } from '@storybook/react';
import IntentionsSelector from './IntentionsSelector';

storiesOf('organisms/IntentionsSelector', module).add('normal', () => (
  <IntentionsSelector value="approval" />
));
