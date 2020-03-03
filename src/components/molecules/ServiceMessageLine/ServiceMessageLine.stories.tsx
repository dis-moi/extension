import React from 'react';
import { storiesOf } from '@storybook/react';
import ServiceMessageLine from './ServiceMessageLine';

storiesOf('molecules/ServiceMessageLine', module).add('normal', () => (
  <ServiceMessageLine />
));
