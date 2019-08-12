import React from 'react';
import { storiesOf } from '@storybook/react';
import Subscriptions from './Subscriptions';
import SubscriptionsEmpty from './SubscriptionsEmpty';
import Suggestions from './Suggestions';
import Wrapper from './Wrapper';

storiesOf('screens/SubscriptionsScreen', module)
  .add('subcriptions', () => <Subscriptions />)
  .add('subcriptions empty', () => <SubscriptionsEmpty />)
  .add('suggestions', () => <Suggestions />);
