import React from 'react';
import { storiesOf } from '@storybook/react';
import ServiceMessageLine from './ServiceMessageLine';

storiesOf('Components/Molecules/ServiceMessageLine', module).add(
  'normal',
  () => <ServiceMessageLine />
);
