import React from 'react';
import { storiesOf } from '@storybook/react';
import Subscriptions from './Subscriptions';
import Wrapper from './Wrapper';

storiesOf('screens/SubscriptionsScreen', module).add('large', () => (
  <Wrapper>
    <Subscriptions />
  </Wrapper>
));
