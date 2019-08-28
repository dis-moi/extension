import React from 'react';
import { storiesOf } from '@storybook/react';
import Subscriptions from './SubscriptionsScreen';
import SubscriptionsEmpty from './Empty';

storiesOf('screens/SubscriptionsScreen', module)
  .add('subcriptions', () => <Subscriptions />)
  .add('subcriptions empty', () => <SubscriptionsEmpty />);
